import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, AboutService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditMemberComponent } from '../../components/add-edit-member/add-edit-member.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-members',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent extends BaseListComponent {
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
  service = inject(AboutService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions.set({
      inputUrl: {
        getAll: 'v2/member/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/member/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'MEMBERS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['isPresident', 'fullName', 'position', 'specialization', 'pageId', 'sectorMemberId', 'programMemberId', 'managementMemberId', 'centerMemberId', 'unitMemberId', 'memberAttachments']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'isPresident',
        header: 'PAGES.MEMBERS.FORM.IS_PRESIDENT.TITLE',
        filter: true,
        trueText: 'PAGES.MEMBERS.FORM.IS_PRESIDENT.PRESIDENT',
        falseText: 'PAGES.MEMBERS.FORM.IS_PRESIDENT.MEMBER',
        filterMode: 'text'
      },
      {
        field: 'fullName',
        header: 'PAGES.MEMBERS.FORM.FULL_NAME',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'position',
        header: 'PAGES.MEMBERS.FORM.POSITION',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'specialization',
        header: 'PAGES.MEMBERS.FORM.SPECIALIZATION',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'pageId',
        header: 'PAGES.SHARE_FORM.PAGE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'sectorMemberId',
        header: 'PAGES.SHARE_FORM.SECTOR',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'programMemberId',
        header: 'PAGES.SHARE_FORM.PROGRAM',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'managementMemberId',
        header: 'PAGES.SHARE_FORM.MANAGEMENT',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'centerMemberId',
        header: 'PAGES.SHARE_FORM.CENTER',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'unitMemberId',
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
        isEdit: true,
        route: 'edit/',
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
}
