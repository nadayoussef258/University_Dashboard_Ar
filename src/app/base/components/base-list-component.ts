// import { Directive, Injectable, OnInit, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { LazyLoadEvent } from 'primeng/api';
// import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
// import { TableOptions } from '../../shared/interfaces';
// import { DataTableService } from '../../shared';
// import { BaseComponent } from './base-component';
// import { HttpService } from '../../core/services/http/http.service';
// import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

// @Directive()
// @Injectable({
//   providedIn: 'root',
// })
// export abstract class BaseListComponent
//   extends BaseComponent
//   implements OnInit
// {
//   // Initialize arrays and use proper typing
//   data: any[] = []; // Better initialization
//   totalCount = 0; // Simplified declaration
//   language = 'ar';
//   dialogRef: DynamicDialogRef | null = null;
//   /* load data at first time */
//   private firstInit: boolean = false; // Better initialization
//   abstract tableOptions: TableOptions;
//   abstract get service(): HttpService;
//   protected override destroy$: Subject<boolean> = new Subject<boolean>();
//   // Use dependency injection with inject() function
//   protected dataTableService = inject(DataTableService);
//   protected dialogService = inject(DialogService);

//   constructor(protected override activatedRoute: ActivatedRoute) {
//     super(activatedRoute);
//   }

//   override ngOnInit(): void {
//     super.ngOnInit();
//     // Add initialization calls
//   }

//   /**
//    * Handle Data Table Event (Sort , Pagination , Filter , Delete , Print)
//    * @param dataTableEvent
//    */
//   // Improved event handling with switch statement
//   handleEvent(dataTableEvent: any): void {
//     switch (dataTableEvent.eventType) {
//       case 'lazyLoad':
//         this.loadLazyLoadedData(dataTableEvent.data);
//         break;
//       case 'reset':
//         this.resetOpt();
//         this.loadDataFromServer();
//         break;
//       case 'filter':
//         this.applyFilter(dataTableEvent.value, dataTableEvent.column);
//         break;
//       case 'delete':
//         this.deleteData(dataTableEvent.data);
//         break;
//       case 'deleteRange':
//         this.deleteRange(dataTableEvent.data);
//         break;
//       case 'export':
//         this.export(
//           dataTableEvent.data.columnNames,
//           dataTableEvent.data.reportName,
//         );
//         break;
//     }
//   }
//   // this to be moved inside data table input filters and emit filter event inside the filter method
//   columnSearchInput(): void {
//     this.dataTableService.searchNew$
//       .pipe(
//         debounceTime(1000),
//         distinctUntilChanged(),
//         takeUntil(this.destroy$),
//       )
//       .subscribe(() => {
//         this.firstInit ? this.loadDataFromServer() : (this.firstInit = true);
//       });
//   }

//   applyFilter(value: any, column: string): void {
//     this.resetOpt();
//     this.dataTableService.opt.filter[column] = value.data;
//     this.loadDataFromServer();
//   }

//   search(filterArray: any): void {
//     // debugger
//     this.dataTableService.opt.filter = filterArray;
//     this.loadDataFromServer(); // Reload data based on the filter
//   }

//   openDialog(
//     component: any,
//     pageTitle: any,
//     data: any,
//     closable: boolean = true,
//   ): void {
//     // Add closable parameter with default value
//     this.dialogRef = this.dialogService.open(component, {
//       header: pageTitle,
//       width: '65%',
//       modal: true,
//       breakpoints: {
//         '1199px': '75vw',
//         '575px': '90vw',
//       },
//       data: data,
//       focusOnShow: false,
//       autoZIndex: true,
//       baseZIndex: 10000,
//       dismissableMask: true,
//       closable, // Set the closable property
//     });
//     this.dialogRef?.onDestroy.subscribe(() => {
//       this.loadDataFromServer();
//     });
//   }

//   // Improved error handling in loadDataFromServer
//   loadDataFromServer(): void {
//     this.dataTableService
//       .loadData(this.tableOptions.inputUrl.getAll)
//       .subscribe({
//         next: (res) => {
//           this.data = res.data;
//           this.totalCount = res.totalCount;
//         },
//         error: () => {
//           this.alert.error('خطأ فى جلب البيانات من الخادم');
//         },
//       });
//   }
//   /* lazy load table data */
//   /* note:  gets called on entering component */
//   loadLazyLoadedData(event?: LazyLoadEvent): void {
//     this.resetOpt();
//     this.setSortColumn(event);
//     this.setPaging(event);
//     this.loadDataFromServer();
//   }

//   /* set SortColumn */
//   setSortColumn(event?: LazyLoadEvent | any): void {
//     this.dataTableService.opt.orderByValue = [];
//     this.dataTableService.opt.orderByValue.push({
//       colId: event.sortField,
//       sort: event.sortOrder === 1 ? 'asc' : 'desc',
//     });
//   }
//   /* set paging parameters*/
//   setPaging(event?: LazyLoadEvent | any): void {
//     this.dataTableService.opt.pageSize = event.rows;
//     this.dataTableService.opt.pageNumber = event.first / event.rows + 1;
//   }

//   // Filter
//   // filter(
//   //   value?: any,
//   //   column?: any,
//   //   filterColumnName?: string,
//   //   dataType?: string
//   // ): void {
//   //   this.resetOpt();
//   //   value = this.checkDataType(value, dataType);
//   //   if (
//   //     filterColumnName !== undefined &&
//   //     filterColumnName !== '' &&
//   //     filterColumnName !== null
//   //   ) {
//   //     this.dataTableService.searchNew$.next(
//   //       (this.dataTableService.opt.filter[filterColumnName] = value)
//   //     );
//   //   } else {
//   //     this.dataTableService.searchNew$.next(
//   //       (this.dataTableService.opt.filter[column] = value)
//   //     );
//   //   }
//   // }

//   // Improved filter method with better typing
//   filter(
//     value?: any,
//     column?: string,
//     filterColumnName?: string,
//     dataType?: string,
//   ): void {
//     this.resetOpt();
//     value = this.checkDataType(value, dataType);

//     const columnKey = filterColumnName || column;
//     if (columnKey) {
//       this.dataTableService.searchNew$.next(
//         (this.dataTableService.opt.filter[columnKey] = value),
//       );
//     }
//   }

//   checkDataType(value: any, dataType?: string): any {
//     if (dataType === 'number') {
//       value = +value;
//     }
//     return value;
//   }

//   deleteData(id: string) {
//     this.dataTableService
//       .delete(this.tableOptions.inputUrl.delete, id)
//       .subscribe((res: any) => {
//         this.data = res.data;
//         this.totalCount = res.totalCount;
//         this.loadDataFromServer();
//       });
//   }

//   deleteRange(id: string[]) {
//     this.dataTableService
//       .deleteRange(this.tableOptions.inputUrl.delete, id)
//       .subscribe({
//         next: (res) => {
//           this.alert.success('VALIDATION.DELETE_SUCCESS');
//           this.data = res.data;
//           this.totalCount = res.totalCount;
//           this.loadDataFromServer();
//         },
//         error: (err) => {
//           this.alert.error('VALIDATION.GET_ERROR');
//         },
//       });
//   }

//   /* reset server options */
//   resetOpt(): void {
//     this.dataTableService.opt = {
//       pageNumber: 1,
//       pageSize: 5,
//       orderByValue: [{ colId: 'id', sort: 'asc' }],
//       filter: {},
//     };

//     this.dataTableService.opt.filter =
//       this.tableOptions.bodyOptions.filter !== null &&
//       this.tableOptions.bodyOptions.filter !== undefined
//         ? this.tableOptions.bodyOptions.filter
//         : this.dataTableService.opt.filter;
//     this.dataTableService.opt.filter.appId =
//       this.tableOptions.appId !== 0 ? this.tableOptions.appId : 0;
//   }

//   // Improved export method with better typing
//   export(sheetDetails: { [k: string]: string }, fileName: string) {
//     const sheetColumnsValues = Object.keys(sheetDetails);
//     const newArray = this.data.map((eachData, index) => {
//       const eachRow: any = { '#': index + 1 };
//       sheetColumnsValues.forEach((col) => {
//         eachRow[sheetDetails[col]] = eachData[col];
//       });
//       return eachRow;
//     });
//     this.excel.exportAsCsvFile(newArray, fileName);
//   }

//   // Add proper cleanup in ngOnDestroy
//   override ngOnDestroy() {
//     console.log('List destroyed');

//     this.dataTableService.searchNew$.next({});
//     super.ngOnDestroy();
//     // this.dataTableService.searchNew$.complete();
//     // this.dataTableService.searchNew$.unsubscribe();
//   }
//   Redirect() {
//     const currentRoute = this.router.url;
//     const index = currentRoute.lastIndexOf('/');
//     const str = currentRoute.substring(0, index);
//     this.router.navigate([str]);
//   }
// }

//
//
//
// import { Directive, Injectable, OnInit, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { LazyLoadEvent } from 'primeng/api';
// import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
// import { TableOptions } from '../../shared/interfaces';
// import { DataTableService } from '../../shared';
// import { BaseComponent } from './base-component';
// import { HttpService } from '../../core/services/http/http.service';
// import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

// @Directive()
// @Injectable({
//   providedIn: 'root',
// })
// export abstract class BaseListComponent
//   extends BaseComponent
//   implements OnInit
// {
//   data!: any[];
//   totalCount: number = 0;
//   language: string = 'ar';
//   dialogRef: DynamicDialogRef | null = null;
//   /* load data at first time */
//   private firstInit!: boolean;
//   abstract tableOptions: TableOptions;
//   abstract get service(): HttpService;
//   protected override destroy$: Subject<boolean> = new Subject<boolean>();
//   dataTableService = inject(DataTableService);
//   dialogService = inject(DialogService);
//   constructor(activatedRoute: ActivatedRoute) {
//     super(activatedRoute);
//   }

//   override ngOnInit(): void {
//     super.ngOnInit();
//   }

//   /**
//    * Handle Data Table Event (Sort , Pagination , Filter , Delete , Print)
//    * @param dataTableEvent
//    */
//   handleEvent(dataTableEvent: any): void {
//     if (dataTableEvent.eventType == 'lazyLoad') {
//       this.loadLazyLoadedData(dataTableEvent.data);
//     }
//     if (dataTableEvent.eventType == 'reset') {
//       this.resetOpt();
//     }

//     // if (dataTableEvent.eventType == 'filter') {
//     //   console.log('dataTableEvent at filter:', dataTableEvent);
//     //   this.filter(dataTableEvent.value, dataTableEvent.column,dataTableEvent.filterColumnName,dataTableEvent.dataType)
//     // }

//     if (dataTableEvent.eventType === 'filter') {
//       this.applyFilter(dataTableEvent.value, dataTableEvent.column);
//     }

//     if (dataTableEvent.eventType == 'delete') {
//       this.deleteData(dataTableEvent.data);
//     }
//     if (dataTableEvent.eventType == 'deleteRange') {
//       this.deleteRange(dataTableEvent.data);
//       this.loadDataFromServer();
//     }
//     if (dataTableEvent.eventType == 'export') {
//       this.export(
//         dataTableEvent.data.columnNames,
//         dataTableEvent.data.reportName,
//       );
//     }
//   }
//   // this to be moved inside data table input filters and emit filter event inside the filter method
//   columnSearchInput(): void {
//     this.dataTableService.searchNew$
//       .pipe(
//         debounceTime(1000),
//         distinctUntilChanged(),
//         takeUntil(this.destroy$),
//       )
//       .subscribe(() => {
//         this.firstInit ? this.loadDataFromServer() : (this.firstInit = true);
//       });
//   }

//   applyFilter(value: any, column: string): void {
//     this.resetOpt();
//     this.dataTableService.opt.filter[column] = value.data;
//     this.loadDataFromServer();
//   }

//   search(filterArray: any): void {
//     // debugger
//     this.dataTableService.opt.filter = filterArray;
//     this.loadDataFromServer(); // Reload data based on the filter
//   }

//   openDialog(
//     component: any,
//     pageTitle: any,
//     data: any,
//     closable: boolean = true,
//   ): void {
//     // Add closable parameter with default value
//     this.dialogRef = this.dialogService.open(component, {
//       header: pageTitle,
//       width: '65%',
//       modal: true,
//       breakpoints: {
//         '1199px': '75vw',
//         '575px': '90vw',
//       },
//       data: data,
//       focusOnShow: false,
//       autoZIndex: true,
//       baseZIndex: 10000,
//       dismissableMask: true,
//       closable: closable, // Set the closable property
//     });
//     this.dialogRef?.onDestroy.subscribe(() => {
//       this.loadDataFromServer();
//     });
//   }

//   // load data from server
//   loadDataFromServer(): void {
//     this.dataTableService
//       .loadData(this.tableOptions.inputUrl.getAll)
//       .subscribe({
//         next: (res) => {
//           this.data = res.data;
//           this.totalCount = res.data.totalCount;
//           console.log('res ::', res);
//         },
//         error: (err) => {
//           this.alert.error('VALIDATION.GET_ERROR');
//         },
//       });
//   }

//   /* lazy load table data */
//   /* note:  gets called on entering component */
//   loadLazyLoadedData(event?: LazyLoadEvent): void {
//     this.resetOpt();
//     this.setSortColumn(event);
//     this.setPaging(event);
//     this.loadDataFromServer();
//   }

//   /* set SortColumn */
//   setSortColumn(event?: LazyLoadEvent | any): void {
//     this.dataTableService.opt.orderByValue = [];
//     this.dataTableService.opt.orderByValue.push({
//       colId: event.sortField,
//       sort: event.sortOrder === 1 ? 'asc' : 'desc',
//     });
//   }
//   /* set paging parameters*/
//   setPaging(event?: LazyLoadEvent | any): void {
//     this.dataTableService.opt.pageSize = event.rows;
//     this.dataTableService.opt.pageNumber = event.first / event.rows + 1;
//   }

//   // Filter
//   filter(
//     value?: any,
//     column?: any,
//     filterColumnName?: string,
//     dataType?: string,
//   ): void {
//     this.resetOpt();
//     value = this.checkDataType(value, dataType);
//     if (
//       filterColumnName !== undefined &&
//       filterColumnName !== '' &&
//       filterColumnName !== null
//     ) {
//       this.dataTableService.searchNew$.next(
//         (this.dataTableService.opt.filter[filterColumnName] = value),
//       );
//     } else {
//       this.dataTableService.searchNew$.next(
//         (this.dataTableService.opt.filter[column] = value),
//       );
//     }
//   }

//   checkDataType(value: any, dataType?: string): any {
//     if (dataType === 'number') {
//       value = +value;
//     }
//     return value;
//   }

//   deleteData(id: string) {
//     this.dataTableService
//       .delete(this.tableOptions.inputUrl.delete, id)
//       .subscribe((res: any) => {
//         this.data = res.data.data;
//         this.totalCount = res.totalCount;
//         this.loadDataFromServer();
//       });
//   }

//   deleteRange(id: string[]) {
//     this.dataTableService
//       .deleteRange(this.tableOptions.inputUrl.delete, id)
//       .subscribe({
//         next: (res) => {
//           this.alert.success('ALIDATION.DELETE_SUCCESS');
//           this.data = res.data.data;
//           this.totalCount = res.data.totalCount;
//           this.loadDataFromServer();
//         },
//         error: (err) => {
//           this.alert.error('VALIDATION.GET_ERROR');
//         },
//       });
//   }

//   /* reset server options */
//   resetOpt(): void {
//     this.dataTableService.opt = {
//       pageNumber: 1,
//       pageSize: 5,
//       orderByValue: [{ colId: 'id', sort: 'asc' }],
//       filter: {},
//     };
//     this.dataTableService.opt.filter =
//       this.tableOptions.bodyOptions.filter !== null &&
//       this.tableOptions.bodyOptions.filter !== undefined
//         ? this.tableOptions.bodyOptions.filter
//         : this.dataTableService.opt.filter;
//     this.dataTableService.opt.filter.appId =
//       this.tableOptions.appId !== 0 ? this.tableOptions.appId : 0;
//   }

//   export(sheetDetails: { [k: string]: string }, fileName: string) {
//     const sheetColumnsValues = Object.keys(sheetDetails);

//     const newArray = this.data.map((eachData, index) => {
//       let eachRow = {};

//       sheetColumnsValues.map((eachColumnValue) => {
//         eachRow = {
//           ...eachRow,
//           ...{ '#': index + 1 },
//           [sheetDetails[eachColumnValue]]: eachData[eachColumnValue],
//         };
//       });

//       return eachRow;
//     });

//     this.excel.exportAsCsvFile(newArray, fileName);
//   }

//   /* when leaving the component */
//   override ngOnDestroy() {
//     console.log('ngOnDestroy');
//     this.dataTableService.searchNew$.next({});
//     super.ngOnDestroy();
//   }
//   Redirect() {
//     const currentRoute = this.router.url;
//     const index = currentRoute.lastIndexOf('/');
//     const str = currentRoute.substring(0, index);
//     this.router.navigate([str]);
//   }
// }

import {
  Directive,
  Injectable,
  OnInit,
  signal,
  effect,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableOptions } from '../../shared/interfaces';
import { DataTableService } from '../../shared';
import { BaseComponent } from './base-component';
import { HttpService } from '../../core/services/http/http.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Directive()
@Injectable({
  providedIn: 'root',
})
export abstract class BaseListComponent
  extends BaseComponent
  implements OnInit
{
  // ✅ signals بدل المتغيرات العادية
  data = signal<any[]>([]);
  totalCount = signal<number>(0);
  language = signal<string>('ar');

  dialogRef: DynamicDialogRef | null = null;

  private firstInit = false;
  abstract tableOptions: TableOptions;
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
    if (dataTableEvent.eventType == 'lazyLoad') {
      this.loadLazyLoadedData(dataTableEvent.data);
    }
    if (dataTableEvent.eventType == 'reset') {
      this.resetOpt();
    }
    if (dataTableEvent.eventType === 'filter') {
      this.applyFilter(dataTableEvent.value, dataTableEvent.column);
    }
    if (dataTableEvent.eventType == 'delete') {
      this.deleteData(dataTableEvent.data);
    }
    if (dataTableEvent.eventType == 'deleteRange') {
      this.deleteRange(dataTableEvent.data);
      this.loadDataFromServer();
    }
    if (dataTableEvent.eventType == 'export') {
      this.export(
        dataTableEvent.data.columnNames,
        dataTableEvent.data.reportName,
      );
    }
  }

  /**
   * تحميل البيانات من الخادم وتحديث signals
   */
  loadDataFromServer(): void {
    this.dataTableService
      .loadData(this.tableOptions.inputUrl.getAll)
      .subscribe({
        next: (res) => {
          this.data.set(res.data); // ✅ تحديث الـ signal بدل متغير عادي
          this.totalCount.set(res.totalCount ?? 0);
        },
        error: () => {
          this.alert.error('VALIDATION.GET_ERROR');
        },
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
      sort: event.sortOrder === 1 ? 'asc' : 'desc',
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
  filter(
    value?: any,
    column?: any,
    filterColumnName?: string,
    dataType?: string,
  ): void {
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
      page: this.dataTableService.opt.pageNumber,
    });
  }

  openDialog(
    component: any,
    pageTitle: any,
    data: any,
    closable: boolean = true,
  ): void {
    // Add closable parameter with default value
    this.dialogRef = this.dialogService.open(component, {
      header: pageTitle,
      width: '65%',
      modal: true,
      breakpoints: {
        '1199px': '75vw',
        '575px': '90vw',
      },
      data: data,
      focusOnShow: false,
      autoZIndex: true,
      baseZIndex: 10000,
      dismissableMask: true,
      closable: closable, // Set the closable property
    });
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
    this.dataTableService
      .delete(this.tableOptions.inputUrl.delete, id)
      .subscribe(() => {
        this.loadDataFromServer(); // ✅ إعادة التحميل
      });
  }

  /**
   * حذف مجموعة عناصر
   */
  deleteRange(ids: string[]) {
    this.dataTableService
      .deleteRange(this.tableOptions.inputUrl.delete, ids)
      .subscribe({
        next: () => {
          this.alert.success('VALIDATION.DELETE_SUCCESS');
          this.loadDataFromServer();
        },
        error: () => {
          this.alert.error('VALIDATION.GET_ERROR');
        },
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
      filter: {},
    };

    this.dataTableService.opt.filter =
      this.tableOptions.bodyOptions.filter ?? this.dataTableService.opt.filter;

    this.dataTableService.opt.filter.appId =
      this.tableOptions.appId !== 0 ? this.tableOptions.appId : 0;
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
          [sheetDetails[col]]: eachData[col],
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
