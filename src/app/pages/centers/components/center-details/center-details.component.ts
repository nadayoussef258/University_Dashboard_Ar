import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  CenterDetailsService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CenterIdService } from '../../center-id.service';

@Component({
  selector: 'app-center-details',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './center-details.component.html',
  styleUrl: './center-details.component.css',
})
export class CenterDetailsComponent extends BaseListComponent {
  centerId: string = '';
  tableOptions!: TableOptions;

  service = inject(CenterDetailsService);
  centerIdService = inject(CenterIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.centerId = this.centerIdService.CenterId();
    this.initializeTableOptions();
    // super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/centerdetail/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/centerdetail/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'CENTER-DETAILS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { centerId: this.centerId },
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
        route: '/pages/center-details/edit/',
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
}
