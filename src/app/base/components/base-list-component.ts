import { Directive, Injectable, OnInit, signal, effect, computed, inject, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableOptions } from '../../shared/interfaces';
import { DataTableService } from '../../shared';
import { BaseComponent } from './base-component';
import { HttpService } from '../../core/services/http/http.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Directive()
@Injectable({
  providedIn: 'root'
})
export abstract class BaseListComponent extends BaseComponent implements OnInit {
  // ✅ signals بدل المتغيرات العادية
  data = signal<any[]>([]);
  totalCount = signal<number>(0);
  language = signal<string>('ar');

  dialogRef: DynamicDialogRef | null = null;

  private firstInit = false;
  abstract tableOptions: WritableSignal<TableOptions>;
  abstract get service(): HttpService;

  dataTableService = inject(DataTableService);
  dialogService = inject(DialogService);

  // ✅ مراقبة عمليات البحث (بدل الاشتراك اليدوي)
  private searchEffec = effect(() => {
    const searchValue = this.dataTableService.searchNew$(); // 👈 قراءة قيمة الـ signal
    if (searchValue === null) return; // أول مرة بيكون null فنتجاهله
    console.log('🔍 search effect running...', searchValue);
    this.firstInit ? this.loadDataFromServer() : (this.firstInit = true);
    console.log('this.firstInit :::', this.firstInit);
  });

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  /**
   * معالجة أحداث الجدول (تحميل، تصفية، حذف... إلخ)
   */
  handleEvent(dataTableEvent: any): void {
    switch (dataTableEvent.eventType) {
      case 'lazyLoad':
        this.loadLazyLoadedData(dataTableEvent.data);
        break;
      case 'reset':
        this.resetOpt();
        break;
      case 'filter':
        this.applyFilter(dataTableEvent.value, dataTableEvent.column);
        break;
      case 'delete':
        this.deleteData(dataTableEvent.data);
        break;
      case 'deleteRange':
        this.deleteRange(dataTableEvent.data);
        break;
      case 'export':
        this.export(dataTableEvent.data.columnNames, dataTableEvent.data.reportName);
        break;
    }
  }

  /**
   * تحميل البيانات من الخادم وتحديث signals
   */
  loadDataFromServer(): void {
    this.dataTableService.loadData(this.tableOptions().inputUrl.getAll).subscribe({
      next: (res) => {
        this.data.set(res.data); // ✅ تحديث الـ signal بدل متغير عادي
        this.totalCount.set(res.totalCount ?? 0);
      },
      error: () => {
        this.alert.error(this.localize.translate.instant('VALIDATION.GET_ERROR'));
      }
    });
  }

  /**
   * تطبيق الفلاتر
   */
  applyFilter(value: any, column: string): void {
    this.resetOpt();
    this.dataTableService.opt.filter[column] = value.data;
    this.loadDataFromServer();
  }

  /**
   * تحميل بيانات الجدول عند التصفح أو الفرز
   */
  loadLazyLoadedData(event?: LazyLoadEvent): void {
    this.resetOpt();
    this.setSortColumn(event);
    this.setPaging(event);
    this.loadDataFromServer();
  }

  /**
   * تحديد عمود الفرز
   */
  setSortColumn(event?: LazyLoadEvent | any): void {
    this.dataTableService.opt.orderByValue = [];
    this.dataTableService.opt.orderByValue.push({
      colId: event.sortField,
      sort: event.sortOrder === 1 ? 'asc' : 'desc'
    });
  }

  /**
   * إعداد بيانات التقسيم (Pagination)
   */
  setPaging(event?: LazyLoadEvent | any): void {
    this.dataTableService.opt.pageSize = event.rows;
    this.dataTableService.opt.pageNumber = event.first / event.rows + 1;
  }

  /**
   * تصفية البيانات
   */
  filter(value?: any, column?: any, filterColumnName?: string, dataType?: string): void {
    this.resetOpt();
    value = this.checkDataType(value, dataType);
    if (filterColumnName) {
      this.dataTableService.opt.filter[filterColumnName] = value;
    } else {
      this.dataTableService.opt.filter[column] = value;
    }

    // 👇 هنا نحدث الإشارة (signal)
    this.dataTableService.searchNew$.set({
      keyword: value,
      page: this.dataTableService.opt.pageNumber
    });
  }

  openDialog(component: any, pageTitle: any, data: any, closable: boolean = true): void {
    // Add closable parameter with default value
    this.dialogRef = this.dialogService.open(component, {
      header: pageTitle,
      data: data,
      width: '60vw',
      height: 'auto',
      position: 'center',

      breakpoints: {
        '1400px': '70vw',
        '1199px': '75vw',
        '991px': '85vw',
        '575px': '95vw'
      },
      styleClass: 'custom-dynamic-dialog',
      maskStyleClass: 'custom-dialog-mask dark-overlay',

      contentStyle: {
        padding: '1.5rem',
        'font-size': '0.95rem'
      },
      style: {
        'border-radius': '12px',
        'box-shadow': '0 8px 24px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden'
      },

      // ⚙️ السلوكيات
      modal: true,
      closable: closable,
      closeOnEscape: true,
      dismissableMask: false,
      resizable: false,
      draggable: false,
      maximizable: false,
      focusTrap: true,
      focusOnShow: false,
      autoZIndex: true,
      baseZIndex: 10000,
      keepInViewport: true,
      appendTo: 'body',

      transitionOptions: '150ms cubic-bezier(0.4, 0, 0.2, 1)'
    });
    //
    this.dialogRef?.onDestroy.subscribe(() => {
      this.loadDataFromServer();
    });
  }

  /**
   * تحويل نوع القيمة لو مطلوبة (رقم أو نص)
   */
  checkDataType(value: any, dataType?: string): any {
    if (dataType === 'number') {
      value = +value;
    }
    return value;
  }

  /**
   * حذف عنصر واحد
   */
  deleteData(id: string) {
    this.dataTableService.delete(this.tableOptions().inputUrl.delete, id).subscribe({
      next: () => {
        (this.localize.translate.instant('VALIDATION.DELETE_SUCCESS'), this.loadDataFromServer()); // ✅ إعادة التحميل
      },
      error: () => this.localize.translate.instant('VALIDATION.GET_ERROR')
    });
  }

  /**
   * حذف مجموعة عناصر
   */
  deleteRange(ids: string[]) {
    this.dataTableService.deleteRange(this.tableOptions().inputUrl.delete, ids).subscribe({
      next: (res) => {
        // this.data.set(res.data)
        // this.totalCount.set(res.totalCount)
        this.alert.success(this.localize.translate.instant('VALIDATION.DELETE_SUCCESS'));
        this.loadDataFromServer();
      },
      error: () => {
        this.alert.error(this.localize.translate.instant('VALIDATION.GET_ERROR'));
      }
    });
  }

  /**
   * إعادة ضبط خيارات الجدول
   */
  resetOpt(): void {
    this.dataTableService.opt = {
      pageNumber: 1,
      pageSize: 5,
      orderByValue: [{ colId: 'id', sort: 'asc' }],
      filter: {}
    };

    this.dataTableService.opt.filter = this.tableOptions().bodyOptions.filter ?? this.dataTableService.opt.filter;

    this.dataTableService.opt.filter.appId = this.tableOptions().appId !== 0 ? this.tableOptions().appId : 0;
  }

  /**
   * تصدير البيانات إلى ملف CSV
   */
  export(sheetDetails: { [k: string]: string }, fileName: string) {
    const sheetColumnsValues = Object.keys(sheetDetails);

    const newArray = this.data().map((eachData, index) => {
      let eachRow = {};
      sheetColumnsValues.forEach((col) => {
        eachRow = {
          ...eachRow,
          '#': index + 1,
          [sheetDetails[col]]: eachData[col]
        };
      });
      return eachRow;
    });

    this.excel.exportAsCsvFile(newArray, fileName);
  }

  /**
   * computed signal لاستخدامها في القالب لو حبيت
   */
  filteredData = computed(() => {
    return this.data().filter((x) => !!x);
  });

  override ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.dataTableService.searchNew$.set(null);
    super.ngOnDestroy();
  }

  /**
   * توجيه المستخدم لصفحة سابقة
   */
  Redirect(): void {
    const currentRoute = this.router.url;
    const index = currentRoute.lastIndexOf('/');
    const str = currentRoute.substring(0, index);
    this.router.navigate([str]);
  }
}
