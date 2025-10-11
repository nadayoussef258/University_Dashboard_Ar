import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  ContactsService,
} from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { takeUntil } from 'rxjs';
import { AddEditStatisticComponent } from '../../components/add-edit-statistic/add-edit-statistic.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(ContactsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/statistics/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/statistics/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'STATISTICS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: ['title', 'value', 'iconPath'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'العنوان',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'phone',
        header: 'رقم الهاتف',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'value',
        header: 'القيمة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'iconPath',
        header: 'رمز الايقونة',
        filter: true,
        filterMode: 'text',
      },
    ];
  }

  initializeTableActions(): TableOptions['inputActions'] {
    return [
      {
        name: 'Edit',
        icon: 'pi pi-file-edit',
        color: 'text-middle',
        isCallBack: true,
        call: (row) => {
          this.openEdit(row);
        },
        allowAll: true,
      },
      {
        name: 'DELETE',
        icon: 'pi pi-trash',
        color: 'text-error',
        allowAll: true,
        isDelete: true,
      },
    ];
  }

  openAdd() {
    this.openDialog(AddEditStatisticComponent, 'اضافة احصائية', {
      pageType: 'add',
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditStatisticComponent, 'تعديل احصائية', {
      pageType: 'edit',
      row: { rowData },
    });
  }

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
