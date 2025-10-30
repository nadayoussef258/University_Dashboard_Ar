import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, ContactsService } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditLogoComponent } from '../../components/add-edit-logo/add-edit-logo.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-logos',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './logos.component.html',
  styleUrl: './logos.component.css'
})
export class LogosComponent extends BaseListComponent {
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
        getAll: 'v2/logos/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/logos/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'LOGOS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['address', 'phone', 'email', 'facebook', 'twitter', 'instagram', 'linkedIn', 'youTube', 'whatsApp', 'mapLocation']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'address',
        header: 'العنوان',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'phone',
        header: 'رقم الهاتف',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'email',
        header: 'البريد الإلكتروني',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'facebook',
        header: 'فيسبوك',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'twitter',
        header: 'تويتر',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'instagram',
        header: 'انستجرام',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'linkedIn',
        header: 'لينكد إن',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'youTube',
        header: 'يوتيوب',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'whatsApp',
        header: 'واتساب',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'mapLocation',
        header: 'موقع الخريطة',
        filter: true,
        filterMode: 'text'
      }
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
        allowAll: true
      },
      {
        name: 'DELETE',
        icon: 'pi pi-trash',
        color: 'text-error',
        allowAll: true,
        isDelete: true
      }
    ];
  }

  openAdd() {
    this.openDialog(AddEditLogoComponent, 'اضافة لوجو الجامعة', {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditLogoComponent, 'تعديل لوجو الجامعة', {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
