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
import { AddEditMemberComponent } from '../../components/add-edit-member/add-edit-member.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-members',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    TranslatePipe,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent extends BaseListComponent {
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
        getAll: 'v2/member/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/member/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'MEMBERS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: [
        'isPresident',
        'fullName',
        'position',
        'specialization',
        'pageId',
        'sectorMemberId',
        'programMemberId',
        'managementMemberId',
        'centerMemberId',
        'unitMemberId',
        'memberAttachments',
      ],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'isPresident',
        header: 'رئيس ام عضو هيئة تدريس',
        filter: true,
        trueText: 'رئيس الجامعة',
        falseText: 'عضو هيئة تدريس',
        filterMode: 'text',
      },
      {
        field: 'fullName',
        header: 'الاسم بالكامل',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'position',
        header: 'المنصب',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'specialization',
        header: 'التخصص',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'pageId',
        header: 'الصفحة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'sectorMemberId',
        header: 'القطاع',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'programMemberId',
        header: 'البرنامج',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'managementMemberId',
        header: 'الإدارة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'centerMemberId',
        header: 'المركز',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'unitMemberId',
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
        isEdit: true,
        route: 'edit/',
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
}
