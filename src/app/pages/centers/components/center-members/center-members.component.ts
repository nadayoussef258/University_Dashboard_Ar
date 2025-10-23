import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  CenterMembersService,
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditCenterMemberComponent } from '../../components/add-edit-center-member/add-edit-center-member.component';
import { CenterIdService } from '../../center-id.service';

@Component({
  selector: 'app-center',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './center-members.component.html',
  styleUrl: './center-members.component.css',
})
export class CenterMembersComponent extends BaseListComponent {
  centerId: string = '';
  tableOptions!: TableOptions;

  service = inject(CenterMembersService);
  centerIdService = inject(CenterIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.centerId = this.centerIdService.CenterId();
    this.initializeTableOptions();
    // super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/centermember/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/centermember/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'CENTER-MEMBERS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { centerId: this.centerId ?? '' },
      },
      responsiveDisplayedProperties: ['isLeader', 'centerId'],
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
        field: 'centerId',
        header: 'المركز',
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
    this.openDialog(AddEditCenterMemberComponent, 'اضافة عضو للمركز', {
      pageType: 'add',
      row: { centerId: this.centerId },
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditCenterMemberComponent, 'تعديل عضو', {
      pageType: 'edit',
      row: { rowData },
    });
  }

  /* when leaving the component */
}
