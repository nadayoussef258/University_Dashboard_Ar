import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  ActionsService,
  ManagementAttachmentService,
} from '../../../../../../shared';
import { TableOptions } from '../../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../../base/components/base-list-component';
import { takeUntil } from 'rxjs';
import { AddEditManagementAttachmentComponent } from '../../components/add-edit-management-attachment/add-edit-management-attachment.component';

@Component({
  selector: 'app-management-attachments',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './management-attachments.component.html',
  styleUrl: './management-attachments.component.css',
})
export class ManagementAttachmentsComponent extends BaseListComponent {
  @Input() managmentId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(ManagementAttachmentService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/managementattachment/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/managementattachment/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'MANAGEMENT-ATTACHMENTS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { managmentId: this.managmentId },
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
    this.openDialog(
      AddEditManagementAttachmentComponent,
      'اضافة مرفق الادارة',
      {
        pageType: 'add',
        row: { managmentId: this.managmentId },
      }
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      AddEditManagementAttachmentComponent,
      'تعديل مرفق الادارة',
      {
        pageType: 'edit',
        row: { rowData },
      }
    );
  }

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
