import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, SectorUnitsService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SectorIdService } from '../../sector-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sector-units',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, ToggleSwitchModule, TranslatePipe],
  templateUrl: './sector-units.component.html',
  styleUrl: './sector-units.component.css'
})
export class SectorUnitsComponent extends BaseListComponent {
  sectorId: string = '';
  tableData: any[] = [];
  tableOptions!: TableOptions;
  service = inject(SectorUnitsService);
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
        getAll: 'v2/sectorunits/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectorunits/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTOR-UNITS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: { sectorId: this.sectorId }
      },
      responsiveDisplayedProperties: ['unitNameAr', 'unitDescriptionAr', 'manager', 'email', 'employeesCount', 'location', 'unitPhone', 'sectorId']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'unitNameAr',
        header: 'PAGES.SECTOR_UNITS.FORM.UNIT_NAME',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'unitDescriptionAr',
        header: 'PAGES.SECTOR_UNITS.FORM.UNIT_DESCRIPTION',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'manager',
        header: 'PAGES.SECTOR_UNITS.FORM.MANAGER',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'email',
        header: 'PAGES.SECTOR_UNITS.FORM.EMAIL',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'employeesCount',
        header: 'PAGES.SECTOR_UNITS.FORM.EMPLOYEES_COUNT',
        filter: true,
        filterMode: 'numeric'
      },
      {
        field: 'location',
        header: 'PAGES.SECTOR_UNITS.FORM.LOCATION',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'unitPhone',
        header: 'PAGES.SECTOR_UNITS.FORM.UNIT_PHONE',
        filter: true,
        filterMode: 'text'
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
        isEdit: true,
        route: '/pages/sector-details/edit/',
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
