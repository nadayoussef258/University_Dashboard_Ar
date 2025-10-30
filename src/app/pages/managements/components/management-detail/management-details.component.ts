import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, ManagementDetailsService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ManagementIdService } from '../../management-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-management-details',
  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, ToggleSwitchModule, TranslatePipe],
  templateUrl: './management-details.component.html',
  styleUrl: './management-details.component.css'
})
export class ManagementDetailsComponent extends BaseListComponent {
  managementId: string = '';
  tableData: any[] = [];
  tableOptions!: TableOptions;

  service = inject(ManagementDetailsService);
  managementIdService = inject(ManagementIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
    // this.managementId = this.managementIdService.ManagementId();
  }

  override ngOnInit(): void {
    this.managementId = this.managementIdService.ManagementId();
    this.initializeTableOptions();
    super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/managementdetail/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/managementdetail/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'MANAGEMENT-DETAILS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: { managementId: this.managementId }
      },
      responsiveDisplayedProperties: ['title', 'description', 'content']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'PAGES.MANAGEMENT_DETAILS.FORM.TITLE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'description',
        header: 'PAGES.MANAGEMENT_DETAILS.FORM.DESCRIPTION',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'content',
        header: 'PAGES.MANAGEMENT_DETAILS.FORM.CONTENT',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'managementId',
        header: 'PAGES.SHARE_FORM.MANAGEMENT',
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
        route: '/pages/management-details/edit/',
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
