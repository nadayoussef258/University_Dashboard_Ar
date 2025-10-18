import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  SectorsService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditSectorMemberComponent } from '../add-edit-sector-member/add-edit-sector-member.component';
import { SectorIdService } from '../../sector-id.service';

@Component({
  selector: 'app-sector-member',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './sector-members.component.html',
  styleUrl: './sector-members.component.css',
})
export class SectorMembersComponent extends BaseListComponent {
  sectorId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(SectorsService);
  sectorIdService = inject(SectorIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
    super.ngOnInit();

    this.sectorId = this.sectorIdService.SectortId();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/sectormember/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectormember/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTOR-MEMBERS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { sectorId: this.sectorId },
      },
      responsiveDisplayedProperties: ['isLeader', 'sectorId'],
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
        field: 'sectorId',
        header: 'القطاع',
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
    this.openDialog(AddEditSectorMemberComponent, 'اضافة عضو للقطاع', {
      pageType: 'add',
      row: { sectorId: this.sectorId },
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditSectorMemberComponent, 'تعديل عضو في القطاع', {
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
