import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  ServicesService,
} from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditServiceComponent } from '../../components/add-edit-service/add-edit-service.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-services',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    TranslatePipe,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(ServicesService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/services/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/services/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SERVICES',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: ['title', 'description', 'iconPath'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'SETTINGS.SERVICES.FORM.TITLE',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'description',
        header: 'SETTINGS.SERVICES.FORM.DESCRIPTION',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'iconPath',
        header: 'SETTINGS.SERVICES.FORM.ICON_PATH',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'isActive',
        header: 'SETTINGS.SERVICES.FORM.IS_ACTIVE.TITLE',
        filter: true,
        filterMode: 'boolean',
        trueText: 'SETTINGS.SERVICES.FORM.IS_ACTIVE.ACTIVE',
        falseText: 'SETTINGS.SERVICES.FORM.IS_ACTIVE.IN_ACTIVE',
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
      AddEditServiceComponent,
      this.localize.translate.instant('SETTINGS.SERVICES.ADD.PAGE_TITLE'),
      {
        pageType: 'add',
      },
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      AddEditServiceComponent,
      this.localize.translate.instant('SETTINGS.SERVICES.EDIT.PAGE_TITLE'),
      {
        pageType: 'edit',
        row: { rowData },
      },
    );
  }
}
