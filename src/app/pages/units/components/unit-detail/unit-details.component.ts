import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-unit-details',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    ToggleSwitchModule,
  ],
  templateUrl: './unit-details.component.html',
  styleUrl: './unit-details.component.css',
})
export class UnitDetailsComponent extends BaseListComponent {
  @Input() unitId: string = '';
  tableData: any[] = [];
  tableOptions!: TableOptions;
  service = inject(UnitDetailsService);
  unitIdService = inject(UnitIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);

    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     takeUntilDestroyed()
    //   )
    //   .subscribe((event: NavigationEnd) => {
    //     const currentUrl = event.urlAfterRedirects.split('?')[0];
    //     if (currentUrl.startsWith('/pages/unit-details')) {
    //       this.unitIdService.setUnitId('');
    //     }
    //   });
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
    super.ngOnInit();

    this.unitId = this.unitIdService.UnitId();
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
      responsiveDisplayedProperties: ['title', 'unitPlace', 'content'],
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
        field: 'unitPlace',
        header: 'مكان الوحدة',
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

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
