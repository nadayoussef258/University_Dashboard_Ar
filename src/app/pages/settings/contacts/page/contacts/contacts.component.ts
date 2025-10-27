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
import { AddEditContactComponent } from '../../components/add-edit-contact/add-edit-contact.component';
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
        header: 'SETTINGS.CONTACTS.FORM.ADDRESS',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'phone',
        header: 'SETTINGS.CONTACTS.FORM.PHONE',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'email',
        header: 'SETTINGS.CONTACTS.FORM.EMAIL',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'facebook',
        header: 'SETTINGS.CONTACTS.FORM.FACEBOOK',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'twitter',
        header: 'SETTINGS.CONTACTS.FORM.TWITTER',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'instagram',
        header: 'SETTINGS.CONTACTS.FORM.INSTAGRAM',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'linkedIn',
        header: 'SETTINGS.CONTACTS.FORM.LINKEDIN',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'youTube',
        header: 'SETTINGS.CONTACTS.FORM.YOUTUBE',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'whatsApp',
        header: 'SETTINGS.CONTACTS.FORM.WHATSAPP',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'mapLocation',
        header: 'SETTINGS.CONTACTS.FORM.MAPLOCATION',
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
      AddEditContactComponent,
      this.localize.translate.instant('SETTINGS.CONTACTS.ADD.PAGE_TITLE'),
      {
        pageType: 'add',
      },
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      AddEditContactComponent,
      this.localize.translate.instant('SETTINGS.CONTACTS.EDIT.PAGE_TITLE'),
      {
        pageType: 'edit',
        row: { rowData },
      },
    );
  }
}
