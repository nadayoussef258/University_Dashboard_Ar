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

import { AddEditStatisticComponent } from '../../components/add-edit-statistic/add-edit-statistic.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-statistics',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    TranslatePipe,
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
        header: 'SETTINGS.STATISTICS.FORM.TITLE',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'value',
        header: 'SETTINGS.STATISTICS.FORM.VALUE',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'iconPath',
        header: 'رمز الايقونة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'phone',
        header: 'SETTINGS.STATISTICS.FORM.IS_ACTIVE.TITLE',
        filter: true,
        filterMode: 'boolean',
        trueText: 'SETTINGS.STATISTICS.FORM.IS_ACTIVE.ACTIVE',
        falseText: 'SETTINGS.STATISTICS.FORM.IS_ACTIVE.IN_ACTIVE',
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
    this.openDialog(
      AddEditStatisticComponent,
      this.localize.translate.instant('SETTINGS.STATISTICS.ADD.PAGE_TITLE'),
      {
        pageType: 'add',
      },
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      AddEditStatisticComponent,
      this.localize.translate.instant('SETTINGS.STATISTICS.EDIT.PAGE_TITLE'),
      {
        pageType: 'edit',
        row: { rowData },
      },
    );
  }
}
