import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, SectorDetailsService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SectorIdService } from '../../sector-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sector-details',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, ToggleSwitchModule, TranslatePipe],
  templateUrl: './sector-details.component.html',
  styleUrl: './sector-details.component.css'
})
export class SectorDetailsComponent extends BaseListComponent {
  sectorId: string = '';
  tableData: any[] = [];
  tableOptions!: TableOptions;
  service = inject(SectorDetailsService);
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
        getAll: 'v2/sectordetails/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectordetails/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTOR-DETAILS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: { sectorId: this.sectorId }
      },
      responsiveDisplayedProperties: ['title', 'description', 'content', 'sectorId']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'PAGES.SECTOR_DETAILS.FORM.TITLE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'description',
        header: 'PAGES.SECTOR_DETAILS.FORM.DESCRIPTION',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'content',
        header: 'PAGES.SECTOR_DETAILS.FORM.CONTENT',
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
