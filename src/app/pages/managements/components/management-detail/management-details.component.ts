import { Component, inject } from '@angular/core';
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

    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     takeUntilDestroyed()
    //   )
    //   .subscribe((event: NavigationEnd) => {
    //     const currentUrl = event.urlAfterRedirects.split('?')[0];
    //     if (currentUrl.startsWith('/pages/management-details')) {
    //       this.managmentIdService.setManagementId('');
    //       console.log(
    //         '🧹 Cleared managementId (navigated to details directly)'
    //       );
    //     }
    //   });
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
    super.ngOnInit();

    this.managementId = this.managmentIdService.ManagmentId();
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

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
