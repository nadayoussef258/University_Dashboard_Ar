import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  SectorDetailsService,
  SectorServicesService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SectorIdService } from '../../sector-id.service';

@Component({
  selector: 'app-sector-services',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    ToggleSwitchModule,
  ],
  templateUrl: './sector-services.component.html',
  styleUrl: './sector-services.component.css',
})
export class SectorServicesComponent extends BaseListComponent {
  sectorId: string = '';
  tableData: any[] = [];
  tableOptions!: TableOptions;
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
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/sectorservices/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectorservices/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTOR-SERVICES',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { sectorId: this.sectorId },
      },
      responsiveDisplayedProperties: [
        'name',
        'details',
        'duration',
        'applicationUrl',
        'downloadUrl',
        'isOnline',
        'category',
        'fees',
        'contactPerson',
        'contactPhone',
      ],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'name',
        header: 'اسم الخدمة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'details',
        header: 'تفاصيل الخدمة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'duration',
        header: 'المدة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'applicationUrl',
        header: 'رابط التقديم',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'downloadUrl',
        header: 'رابط التحميل',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'isOnline',
        header: 'أونلاين',
        filter: true,
        trueText: 'متاح اون لاين',
        falseText: 'غير متاح اون لاين',
        filterMode: 'boolean',
      },
      {
        field: 'category',
        header: 'الفئة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'fees',
        header: 'الرسوم',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'contactPerson',
        header: 'مسؤول التواصل',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'contactPhone',
        header: 'رقم الهاتف',
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
        route: '/pages/sector-services/edit/',
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

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
