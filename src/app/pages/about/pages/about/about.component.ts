import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  AboutService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditAboutComponent } from '../../components/add-edit-about/add-edit-about.component';

@Component({
  selector: 'app-about',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent extends BaseListComponent {
  tableOptions!: TableOptions;
  service = inject(AboutService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/about/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/about/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'ABOUT',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: [
        'pageTitle',
        'content',
        'mission',
        'vision',
        'history',
      ],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'pageName',
        header: 'عنوان الصفحة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'content',
        header: 'المحتوي',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'mission',
        header: 'الرسالة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'vision',
        header: 'الرؤية',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'history',
        header: 'نبذة تاريخة',
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
    this.openDialog(AddEditAboutComponent, 'اضافة نبذة عنا', {
      pageType: 'add',
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditAboutComponent, 'تعديل نبذة عنا', {
      pageType: 'edit',
      row: { rowData },
    });
  }

  /* when leaving the component */
}
