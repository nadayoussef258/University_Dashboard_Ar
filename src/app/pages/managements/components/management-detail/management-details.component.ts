import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  ManagementDetailsService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ManagmentIdService } from '../../managment-id.service';

@Component({
  selector: 'app-management-details',
  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    ToggleSwitchModule,
  ],
  templateUrl: './management-details.component.html',
  styleUrl: './management-details.component.css',
})
export class ManagementDetailsComponent extends BaseListComponent {
  managementId: string = '';
  tableData: any[] = [];
  tableOptions!: TableOptions;

  service = inject(ManagementDetailsService);
  managmentIdService = inject(ManagmentIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
    // this.managementId = this.managmentIdService.ManagmentId();
  }

  override ngOnInit(): void {
    this.managementId = this.managmentIdService.ManagmentId();
    this.initializeTableOptions();
    super.ngOnInit();
    console.log('searchEffect:', this['searchEffec']);
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/managementdetail/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/managementdetail/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'MANAGEMENT-DETAILS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { managementId: this.managementId },
      },
      responsiveDisplayedProperties: ['title', 'description', 'content'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'العنوان',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'description',
        header: 'الوصف',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'content',
        header: 'المحتوي',
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
        route: '/pages/management-details/edit/',
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
