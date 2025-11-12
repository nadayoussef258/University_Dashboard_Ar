import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, SectorServicesService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SectorIdService } from '../../sector-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sector-services',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, ToggleSwitchModule, TranslatePipe],
  templateUrl: './sector-services.component.html',
  styleUrl: './sector-services.component.css'
})
export class SectorServicesComponent extends BaseListComponent {
  sectorId: string = '';
  tableData: any[] = [];
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
  service = inject(SectorServicesService);
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
        getAll: 'v2/sectorservices/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectorservices/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTOR-SERVICES',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: { sectorId: this.sectorId }
      },
      responsiveDisplayedProperties: ['name', 'details', 'duration', 'applicationUrl', 'downloadUrl', 'category', 'fees', 'contactPerson', 'isOnline', 'sectorId']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'name',
        header: 'PAGES.SECTOR_SERVICES.FORM.NAME',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'details',
        header: 'PAGES.SECTOR_SERVICES.FORM.DETAILS',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'duration',
        header: 'PAGES.SECTOR_SERVICES.FORM.DURATION',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'applicationUrl',
        header: 'PAGES.SECTOR_SERVICES.FORM.APPLICATION_URL',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'downloadUrl',
        header: 'PAGES.SECTOR_SERVICES.FORM.DOWNLOAD_URL',
        filter: true,
        filterMode: 'text'
      },

      {
        field: 'category',
        header: 'PAGES.SECTOR_SERVICES.FORM.CATEGORY',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'fees',
        header: 'PAGES.SECTOR_SERVICES.FORM.FEES',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'contactPerson',
        header: 'PAGES.SECTOR_SERVICES.FORM.CONTACT_PERSON',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'contactPhone',
        header: 'PAGES.SECTOR_SERVICES.FORM.CONTACT_PHONE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'isOnline',
        header: 'PAGES.SECTOR_SERVICES.FORM.IS_ONLINE.TITLE',
        filter: true,
        trueText: 'PAGES.SECTOR_SERVICES.FORM.IS_ONLINE.ONLINE',
        falseText: 'PAGES.SECTOR_SERVICES.FORM.IS_ONLINE.OFFLINE',
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
        isEdit: true,
        route: '/pages/sector-services/edit/',
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
