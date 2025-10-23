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
import { takeUntil } from 'rxjs';
import { AddEditServiceComponent } from '../../components/add-edit-service/add-edit-service.component';

@Component({
  selector: 'app-services',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
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
        header: 'العنوان',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'description',
        header: 'الوصف',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'iconPath',
        header: ' رمز الأيقونة',
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
    this.openDialog(AddEditServiceComponent, 'اضافة خدمة', {
      pageType: 'add',
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditServiceComponent, 'تعديل خدمة', {
      pageType: 'edit',
      row: { rowData },
    });
  }

  /* when leaving the component */
}
