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
import { ManagementIdService } from '../../management-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-management-member',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    TranslatePipe,
  ],
  templateUrl: './management-members.component.html',
  styleUrl: './management-members.component.css',
})
export class ManagementMembersComponent extends BaseListComponent {
  managementId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(ManagementMembersService);
  managementIdService = inject(ManagementIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.managementId = this.managementIdService.ManagementId();

    this.initializeTableOptions();
    super.ngOnInit();

    this.managementId = this.managementIdService.ManagementId();
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
        header: 'PAGES.SHARE_FORM.IS_LEADER.TITLE',
        trueText: 'PAGES.SHARE_FORM.IS_LEADER.LEADER',
        falseText: 'PAGES.SHARE_FORM.IS_LEADER.PERSON',
        filter: true,
        filterMode: 'boolean',
      },
      {
        field: 'managementId',
        header: 'PAGES.SHARE_FORM.MANAGEMENT',
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
      AddEditManagementMemberComponent,
      this.localize.translate.instant(
        'PAGES.MANAGEMENT_MEMBERS.ADD.PAGE_TITLE',
      ),
      { pageType: 'add', row: { managementId: this.managementId } },
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      AddEditManagementMemberComponent,
      this.localize.translate.instant(
        'PAGES.MANAGEMENT_MEMBERS.EDIT.PAGE_TITLE',
      ),
      { pageType: 'edit', row: { rowData } },
    );
  }
}
