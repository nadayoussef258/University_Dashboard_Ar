import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  SectorProgramsService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditSectorProgramComponent } from '../add-edit-sector-program/add-edit-sector-program.component';
import { SectorIdService } from '../../sector-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sector-programs',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    TranslatePipe,
  ],
  templateUrl: './sector-programs.component.html',
  styleUrl: './sector-programs.component.css',
})
export class SectorProgramsComponent extends BaseListComponent {
  sectorId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(SectorProgramsService);
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
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/sectorprograms/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectorprograms/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTOR-PROGRAMS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { sectorId: this.sectorId },
      },
      responsiveDisplayedProperties: ['name', 'sectorId'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'name',
        header: 'PAGES.SECTOR_PROGRAMS.FORM.NAME',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'sectorId',
        header: 'PAGES.SHARE_FORM.SECTOR',
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
      AddEditSectorProgramComponent,
      this.localize.translate.instant('PAGES.SECTOR_PROGRAMS.ADD.PAGE_TITLE'),
      { pageType: 'add', row: { sectorId: this.sectorId } },
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      AddEditSectorProgramComponent,
      this.localize.translate.instant('PAGES.SECTOR_PROGRAMS.ADD.PAGE_TITLE'),
      { pageType: 'edit', row: { rowData } },
    );
  }
}
