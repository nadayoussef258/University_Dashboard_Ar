import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, SectorsService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditSectorMemberComponent } from '../add-edit-sector-member/add-edit-sector-member.component';
import { SectorIdService } from '../../sector-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sector-member',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './sector-members.component.html',
  styleUrl: './sector-members.component.css'
})
export class SectorMembersComponent extends BaseListComponent {
  sectorId: string = '';
  isEnglish = false;
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
  service = inject(SectorsService);
  sectorIdService = inject(SectorIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.sectorId = this.sectorIdService.SectortId();
    this.initializeTableOptions();
    super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions.set({
      inputUrl: {
        getAll: 'v2/sectormember/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectormember/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTOR-MEMBERS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: { sectorId: this.sectorId }
      },
      responsiveDisplayedProperties: ['isLeader', 'sectorId']
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
        field: 'sectorId',
        header: 'PAGES.SHARE_FORM.SECTOR',
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
    this.openDialog(AddEditSectorMemberComponent, this.localize.translate.instant('PAGES.SECTOR_MEMBERS.ADD.PAGE_TITLE'), { pageType: 'add', row: { sectorId: this.sectorId } });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditSectorMemberComponent, this.localize.translate.instant('PAGES.SECTOR_MEMBERS.EDIT.PAGE_TITLE'), { pageType: 'edit', row: { rowData } });
  }
}
