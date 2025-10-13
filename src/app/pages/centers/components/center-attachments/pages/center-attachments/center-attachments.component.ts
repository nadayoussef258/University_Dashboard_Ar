import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  CenterAttachmentsService,
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
} from '../../../../../../shared';
import { TableOptions } from '../../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../../base/components/base-list-component';
import { takeUntil } from 'rxjs';
import { AddEditCenterAttachmentComponent } from '../../components/add-edit-center-attachment/add-edit-center-attachment.component';

@Component({
  selector: 'app-center-attachments',
  standalone: true,
  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './center-attachments.component.html',
  styleUrl: './center-attachments.component.css',
})
export class CenterAttachmentsComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(CenterAttachmentsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/centerattachment/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/centerattachment/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'CENTER-ATTACHMENTS',
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
        header: 'الكــود',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'name',
        header: 'الاســم',
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
    this.openDialog(AddEditCenterAttachmentComponent, 'اضافة مرفق للمركز', {
      pageType: 'add',
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditCenterAttachmentComponent, 'تعديل مرفق المركز', {
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
