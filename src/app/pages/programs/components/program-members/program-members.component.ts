import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, ProgramMembersService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditProgramMemberComponent } from '../add-edit-program-member/add-edit-program-member.component';
import { ProgramIdService } from '../../program-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-programs',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './program-members.component.html',
  styleUrl: './program-members.component.css'
})
export class ProgramMembersComponent extends BaseListComponent {
  programId: string = '';
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);

  service = inject(ProgramMembersService);
  programIdService = inject(ProgramIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.programId = this.programIdService.ProgramId();
    this.initializeTableOptions();
    // super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions.set({
      inputUrl: {
        getAll: 'v2/programmember/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/programmember/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'PROGRAM-MEMBERS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: { programId: this.programId ?? '' }
      },
      responsiveDisplayedProperties: ['isLeader', 'programId']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'isLeader',
        header: 'PAGES.SHARE_FORM.IS_LEADER.TITLE',
        trueText: 'PAGES.SHARE_FORM.IS_LEADER.LEADER',
        falseText: 'PAGES.SHARE_FORM.IS_LEADER.ADMIN',
        filter: true,
        filterMode: 'boolean'
      },
      {
        field: 'programId',
        header: 'PAGES.SHARE_FORM.PROGRAM',
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
    this.openDialog(AddEditProgramMemberComponent, this.localize.translate.instant('PAGES.PROGRAM_MEMBERS.ADD.PAGE_TITLE'), {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditProgramMemberComponent, this.localize.translate.instant('PAGES.PROGRAM_MEMBERS.EDIT.PAGE_TITLE'), {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
