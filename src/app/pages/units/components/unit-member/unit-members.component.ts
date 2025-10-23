import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  UnitMembersService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditUnitMemberComponent } from '../add-edit-unit-member/add-edit-unit-member.component';
import { UnitIdService } from '../../unit-id.service';

@Component({
  selector: 'app-unit-member',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './unit-members.component.html',
  styleUrl: './unit-members.component.css',
})
export class UnitMembersComponent extends BaseListComponent {
  unitId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(UnitMembersService);
  unitIdService = inject(UnitIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.unitId = this.unitIdService.UnitId();
    this.initializeTableOptions();
    super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/unitmember/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/unitmember/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'UNIT-MEMBERS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { unitId: this.unitId },
      },
      responsiveDisplayedProperties: ['isLeader', 'unitId'],
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
        field: 'unitId',
        header: 'الوحدة',
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
    this.openDialog(AddEditUnitMemberComponent, 'اضافة عضو للوحدة', {
      pageType: 'add',
      row: { unitId: this.unitId },
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditUnitMemberComponent, 'تعديل عضو الوحدة', {
      pageType: 'edit',
      row: { rowData },
    });
  }

  /* when leaving the component */
}
