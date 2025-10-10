import { Directive, Injectable, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
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
  // Initialize arrays and use proper typing
  data: any[] = []; // Better initialization
  totalCount = 0; // Simplified declaration
  language = 'ar';
  dialogRef: DynamicDialogRef | null = null;
  /* load data at first time */
  private firstInit: boolean = false; // Better initialization
  abstract tableOptions: TableOptions;
  abstract get service(): HttpService;
  protected override destroy$: Subject<boolean> = new Subject<boolean>();
  // Use dependency injection with inject() function
  protected dataTableService = inject(DataTableService);
  protected dialogService = inject(DialogService);

  constructor(protected override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // Add initialization calls
    this.columnSearchInput();
    this.resetOpt();
    this.loadDataFromServer();
  }

  /**
   * Handle Data Table Event (Sort , Pagination , Filter , Delete , Print)
   * @param dataTableEvent
   */
  // Improved event handling with switch statement
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
  // this to be moved inside data table input filters and emit filter event inside the filter method
  columnSearchInput(): void {
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
    // debugger
    this.dataTableService.opt.filter = filterArray;
    this.loadDataFromServer(); // Reload data based on the filter
  }

  openDialog(
    component: any,
    pageTitle: any,
    data: any,
    closable: boolean = true
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
      closable, // Set the closable property
    });
    this.dialogRef?.onDestroy.subscribe(() => {
      this.loadDataFromServer();
    });
  }

  // Improved error handling in loadDataFromServer
  loadDataFromServer(): void {
    this.dataTableService
      .loadData(this.tableOptions.inputUrl.getAll)
      .subscribe({
        next: (res) => {
          this.data = res.data;
          this.totalCount = res.totalCount;
        },
        error: () => {
          this.alert.error('خطأ فى جلب البيانات من الخادم');
        },
      });
  }
  /* lazy load table data */
  /* note:  gets called on entering component */
  loadLazyLoadedData(event?: LazyLoadEvent): void {
    this.resetOpt();
    this.setSortColumn(event);
    this.setPaging(event);
    this.loadDataFromServer();
  }

  /* set SortColumn */
  setSortColumn(event?: LazyLoadEvent | any): void {
    this.dataTableService.opt.orderByValue = [];
    this.dataTableService.opt.orderByValue.push({
      colId: event.sortField,
      sort: event.sortOrder === 1 ? 'asc' : 'desc',
    });
  }
  /* set paging parameters*/
  setPaging(event?: LazyLoadEvent | any): void {
    this.dataTableService.opt.pageSize = event.rows;
    this.dataTableService.opt.pageNumber = event.first / event.rows + 1;
  }

  // Filter
  // filter(
  //   value?: any,
  //   column?: any,
  //   filterColumnName?: string,
  //   dataType?: string
  // ): void {
  //   this.resetOpt();
  //   value = this.checkDataType(value, dataType);
  //   if (
  //     filterColumnName !== undefined &&
  //     filterColumnName !== '' &&
  //     filterColumnName !== null
  //   ) {
  //     this.dataTableService.searchNew$.next(
  //       (this.dataTableService.opt.filter[filterColumnName] = value)
  //     );
  //   } else {
  //     this.dataTableService.searchNew$.next(
  //       (this.dataTableService.opt.filter[column] = value)
  //     );
  //   }
  // }

  // Improved filter method with better typing
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

  checkDataType(value: any, dataType?: string): any {
    if (dataType === 'number') {
      value = +value;
    }
    return value;
  }

  deleteData(id: string) {
    this.dataTableService
      .delete(this.tableOptions.inputUrl.delete, id)
      .subscribe((res: any) => {
        this.data = res.data;
        this.totalCount = res.totalCount;
        this.loadDataFromServer();
      });
  }

  deleteRange(id: string[]) {
    this.dataTableService
      .deleteRange(this.tableOptions.inputUrl.delete, id)
      .subscribe({
        next: (res) => {
          this.alert.success('VALIDATION.DELETE_SUCCESS');
          this.data = res.data;
          this.totalCount = res.totalCount;
          this.loadDataFromServer();
        },
        error: (err) => {
          this.alert.error('VALIDATION.GET_ERROR');
        },
      });
  }

  /* reset server options */
  resetOpt(): void {
    this.dataTableService.opt = {
      pageNumber: 1,
      pageSize: 5,
      orderByValue: [{ colId: 'id', sort: 'asc' }],
      filter: {},
    };
    this.dataTableService.opt.filter =
      this.tableOptions.bodyOptions.filter !== null &&
      this.tableOptions.bodyOptions.filter !== undefined
        ? this.tableOptions.bodyOptions.filter
        : this.dataTableService.opt.filter;
    this.dataTableService.opt.filter.appId =
      this.tableOptions.appId !== 0 ? this.tableOptions.appId : 0;
  }

  // Improved export method with better typing
  export(sheetDetails: { [k: string]: string }, fileName: string) {
    const sheetColumnsValues = Object.keys(sheetDetails);
    const newArray = this.data.map((eachData, index) => {
      const eachRow: any = { '#': index + 1 };
      sheetColumnsValues.forEach((col) => {
        eachRow[sheetDetails[col]] = eachData[col];
      });
      return eachRow;
    });
    this.excel.exportAsCsvFile(newArray, fileName);
  }

  // Add proper cleanup in ngOnDestroy
  override ngOnDestroy() {
    this.dataTableService.searchNew$.next({});
    // this.dataTableService.searchNew$.complete();
    this.dataTableService.searchNew$.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.complete();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  Redirect() {
    const currentRoute = this.router.url;
    const index = currentRoute.lastIndexOf('/');
    const str = currentRoute.substring(0, index);
    this.router.navigate([str]);
  }
}
