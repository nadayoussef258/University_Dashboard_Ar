import { Directive, Injectable, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

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
  data: any[] = [];
  totalCount = 0;
  language = 'ar';
  dialogRef: DynamicDialogRef | null = null;

  private firstInit = false;

  abstract tableOptions: TableOptions;
  abstract get service(): HttpService;

  // Injected services
  protected dataTableService = inject(DataTableService);
  protected dialogService = inject(DialogService);

  constructor(protected override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.columnSearchInput();
    this.resetOpt();
    this.loadDataFromServer();
  }

  /** Handle Data Table Event (Sort , Pagination , Filter , Delete , Print) */
  handleEvent(dataTableEvent: any): void {
    switch (dataTableEvent.eventType) {
      case 'lazyLoad':
        this.loadLazyLoadedData(dataTableEvent.data);
        break;
      case 'reset':
        this.resetOpt();
        this.loadDataFromServer();
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
        this.export(
          dataTableEvent.data.columnNames,
          dataTableEvent.data.reportName
        );
        break;
    }
  }

  /** Column Search with debounce */
  private columnSearchInput(): void {
    this.dataTableService.searchNew$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.firstInit ? this.loadDataFromServer() : (this.firstInit = true);
      });
  }

  applyFilter(value: any, column: string): void {
    this.resetOpt();
    this.dataTableService.opt.filter[column] = value.data;
    this.loadDataFromServer();
  }

  search(filterArray: any): void {
    this.dataTableService.opt.filter = filterArray;
    this.loadDataFromServer();
  }

  openDialog(
    component: any,
    pageTitle: string,
    data: any,
    closable: boolean = true
  ): void {
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
      closable,
    });

    this.dialogRef?.onDestroy.subscribe(() => this.loadDataFromServer());
  }

  /** Load data from server */
  loadDataFromServer(): void {
    this.dataTableService
      .loadData(this.tableOptions.inputUrl.getAll)
      .subscribe({
        next: (res) => {
          this.data = res.data;
          console.log('res.data::', this.data);

          this.totalCount = res.data.length ?? 0;
        },
        error: () => {
          this.alert.error(
            // this.localize.translate.instant('VALIDATION.GET_ERROR')
            'خطأ فى جلب البيانات من الخادم'
          );
        },
      });
  }

  /** Lazy load data */
  private loadLazyLoadedData(event?: LazyLoadEvent): void {
    this.resetOpt();
    this.setSortColumn(event);
    this.setPaging(event);
    this.loadDataFromServer();
  }

  private setSortColumn(event?: LazyLoadEvent | any): void {
    this.dataTableService.opt.orderByValue = [
      {
        colId: event.sortField,
        sort: event.sortOrder === 1 ? 'asc' : 'desc',
      },
    ];
  }

  private setPaging(event?: LazyLoadEvent | any): void {
    this.dataTableService.opt.pageSize = event.rows;
    this.dataTableService.opt.pageNumber = event.first / event.rows + 1;
  }

  /** Filtering */
  filter(
    value?: any,
    column?: string,
    filterColumnName?: string,
    dataType?: string
  ): void {
    this.resetOpt();
    value = this.checkDataType(value, dataType);

    const columnKey = filterColumnName || column;
    if (columnKey) {
      this.dataTableService.searchNew$.next(
        (this.dataTableService.opt.filter[columnKey] = value)
      );
    }
  }

  private checkDataType(value: any, dataType?: string): any {
    return dataType === 'number' ? +value : value;
  }

  deleteData(id: string) {
    this.dataTableService
      .delete(this.tableOptions.inputUrl.delete, id)
      .subscribe(() => this.loadDataFromServer());
  }

  deleteRange(ids: string[]) {
    this.dataTableService
      .deleteRange(this.tableOptions.inputUrl.delete, ids)
      .subscribe({
        next: () => {
          this.alert.success(
            // this.localize.translate.instant('VALIDATION.DELETE_SUCCESS')
            'تم الحذف بنجاح'
          );
          this.loadDataFromServer();
        },
        error: () => {
          this.alert.error(
            // this.localize.translate.instant('VALIDATION.GET_ERROR')
            'خطأ فى جلب البيانات من الخادم'
          );
        },
      });
  }

  resetOpt(): void {
    this.dataTableService.opt = {
      pageNumber: 1,
      pageSize: 5,
      orderByValue: [{ colId: 'id', sort: 'asc' }],
      filter: {},
    };

    if (this.tableOptions.bodyOptions?.filter) {
      this.dataTableService.opt.filter = this.tableOptions.bodyOptions.filter;
    }

    this.dataTableService.opt.filter.appId = this.tableOptions.appId || 0;
  }

  export(sheetDetails: { [k: string]: string }, fileName: string) {
    const sheetColumnsValues = Object.keys(sheetDetails);

    const newArray = this.data.map((eachData, index) => {
      let eachRow: any = { '#': index + 1 };

      sheetColumnsValues.forEach((col) => {
        eachRow[sheetDetails[col]] = eachData[col];
      });

      return eachRow;
    });

    this.excel.exportAsCsvFile(newArray, fileName);
  }

  Redirect() {
    const currentRoute = this.router.url;
    const index = currentRoute.lastIndexOf('/');
    const str = currentRoute.substring(0, index);
    this.router.navigate([str]);
  }
}
