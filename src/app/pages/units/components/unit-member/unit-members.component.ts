import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, UnitMembersService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditUnitMemberComponent } from '../add-edit-unit-member/add-edit-unit-member.component';
import { UnitIdService } from '../../unit-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-unit-member',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './unit-members.component.html',
  styleUrl: './unit-members.component.css'
})
export class UnitMembersComponent extends BaseListComponent {
  unitId: string = '';
  isEnglish = false;
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
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
    this.tableOptions.set({
      inputUrl: {
        getAll: 'v2/unitmember/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/unitmember/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'UNIT-MEMBERS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: { unitId: this.unitId }
      },
      responsiveDisplayedProperties: ['isLeader', 'unitId']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'isLeader',
        header: 'PAGES.SHARE_FORM.IS_LEADER.TITLE',
        trueText: 'PAGES.SHARE_FORM.IS_LEADER.LEADER',
        falseText: 'PAGES.SHARE_FORM.IS_LEADER.PERSON',
        filter: true,
        filterMode: 'boolean'
      },
      {
        field: 'unitId',
        header: 'PAGES.SHARE_FORM.UNIT',
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
    this.openDialog(AddEditUnitMemberComponent, this.localize.translate.instant('PAGES.UNIT_MEMBERS.ADD.PAGE_TITLE'), {
      pageType: 'add',
      row: { unitId: this.unitId }
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditUnitMemberComponent, this.localize.translate.instant('PAGES.UNIT_MEMBERS.EDIT.PAGE_TITLE'), {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
