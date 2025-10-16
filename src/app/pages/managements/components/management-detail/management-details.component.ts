import { Component, inject, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  ManagementDetailsService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

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
export class ManagementDetailsComponent
  extends BaseListComponent
  implements OnChanges
{
  @Input() managementId: string = '';
  tableData: any[] = [];
  tableOptions!: TableOptions;
  service = inject(ManagementDetailsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    // لو اتبعت كـ input من تبويب
    if (!this.managementId) {
      // لو مفتوح كـ route
      this.managementId =
        this.activatedRoute.snapshot.paramMap.get('managementId') ??
        this.activatedRoute.snapshot.paramMap.get('id') ??
        '';
    }

    this.initializeTableOptions();
    super.ngOnInit();
  }

  ngOnChanges(): void {
    if (this.managementId) {
      this.initializeTableOptions();
      this.loadDataFromServer();
    }
  }

  initializeTableOptions() {
    const hasManagementId = !!this.managementId;

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
        filter: hasManagementId ? { managementId: this.managementId } : {},
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

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log(`destroy ManagementDetailsComponent`);

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
