import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  ManagementMembersService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditManagementMemberComponent } from '../add-edit-management-member/add-edit-management-member.component';
import { ManagmentIdService } from '../../managment-id.service';

@Component({
  selector: 'app-management-member',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './management-members.component.html',
  styleUrl: './management-members.component.css',
})
export class ManagementMembersComponent extends BaseListComponent {
  managementId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(ManagementMembersService);
  managmentIdService = inject(ManagmentIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.managementId = this.managmentIdService.ManagmentId();

    this.initializeTableOptions();
    super.ngOnInit();

    this.managementId = this.managmentIdService.ManagmentId();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/managementmember/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/managementmember/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'MANAGEMENT-MEMBERS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { managementId: this.managementId },
      },
      responsiveDisplayedProperties: ['isLeader', 'managementId'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'isLeader',
        header: 'الحالة',
        trueText: 'ادمن',
        falseText: 'مستخدم',
        filter: true,
        filterMode: 'boolean',
      },
      {
        field: 'managementId',
        header: 'الادارة',
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
    this.openDialog(AddEditManagementMemberComponent, 'اضافة عضو للإدارة', {
      pageType: 'add',
      row: { managementId: this.managementId },
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditManagementMemberComponent, 'تعديل عضو الإدارة', {
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
