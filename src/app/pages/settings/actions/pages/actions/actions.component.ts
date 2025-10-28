import { Component, effect, inject, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  ActionsService,
} from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditActionComponent } from '../../components/add-edit-action/add-edit-action.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-actions',
  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    TranslatePipe,
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent extends BaseListComponent {
  tableOptions!: TableOptions;
  service = inject(ActionsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  // 👇 هنا بيتابع اللغة ويعيد بناء الجدول لما تتغير
  private languageEffect = effect(() => {
    const lang = this.localize.currentLanguage();
    console.log('🌐 اللغة الحالية:', lang);
    this.initializeTableOptions();
  });

  override ngOnInit(): void {
    super.ngOnInit();
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/actions/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/actions/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'ACTIONS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: ['code', 'name'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'code',
        header: 'PAGES.ACTIONS.FORM.CODE',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'name',
        header: 'PAGES.ACTIONS.FORM.NAME',
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
    this.openDialog(
      AddEditActionComponent,
      this.localize.translate.instant('PAGES.ACTIONS.ADD.PAGE_TITLE'),
      {
        pageType: 'add',
      },
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      AddEditActionComponent,
      this.localize.translate.instant('PAGES.ACTIONS.EDIT.PAGE_TITLE'),
      {
        pageType: 'edit',
        row: { rowData },
      },
    );
  }
}
