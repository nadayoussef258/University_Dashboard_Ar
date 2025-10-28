import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  UnitDetailsService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { UnitIdService } from '../../unit-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-unit-details',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    ToggleSwitchModule,
    TranslatePipe,
  ],
  templateUrl: './unit-details.component.html',
  styleUrl: './unit-details.component.css',
})
export class UnitDetailsComponent extends BaseListComponent {
  unitId: string = '';
  tableData: any[] = [];
  tableOptions!: TableOptions;
  service = inject(UnitDetailsService);
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
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/unitdetail/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/unitdetail/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'UNIT-DETAILS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { unitId: this.unitId },
      },
      responsiveDisplayedProperties: ['title', 'unitPlace', 'description'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'PAGES.UNIT_DETAILS.FORM.TITLE',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'unitPlace',
        header: 'PAGES.UNIT_DETAILS.FORM.UNIT_PLACE',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'description',
        header: 'PAGES.UNIT_DETAILS.FORM.DESCRIPTION',
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
        route: '/pages/unit-details/edit/',
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
