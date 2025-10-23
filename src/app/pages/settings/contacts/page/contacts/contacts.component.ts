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
import { AddEditContactComponent } from '../../components/add-edit-contact/add-edit-contact.component';

@Component({
  selector: 'app-actions',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent extends BaseListComponent {
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
        getAll: 'v2/contacts/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/contacts/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'CONTACTS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: [
        'address',
        'phone',
        'email',
        'facebook',
        'twitter',
        'instagram',
        'linkedIn',
        'youTube',
        'whatsApp',
        'mapLocation',
      ],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'address',
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
        field: 'email',
        header: 'البريد الإلكتروني',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'facebook',
        header: 'فيسبوك',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'twitter',
        header: 'تويتر',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'instagram',
        header: 'انستجرام',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'linkedIn',
        header: 'لينكد إن',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'youTube',
        header: 'يوتيوب',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'whatsApp',
        header: 'واتساب',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'mapLocation',
        header: 'موقع الخريطة',
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
    this.openDialog(AddEditContactComponent, 'اضافة تفاصيل الاتصال', {
      pageType: 'add',
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditContactComponent, 'تعديل تفاصيل الاتصال', {
      pageType: 'edit',
      row: { rowData },
    });
  }

  /* when leaving the component */
}
