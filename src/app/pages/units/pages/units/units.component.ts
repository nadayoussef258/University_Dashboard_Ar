import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  ManagementsService,
  UnitsService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';

@Component({
  selector: 'app-units',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './units.component.html',
  styleUrl: './units.component.css',
})
export class UnitsComponent extends BaseListComponent {
  tableOptions!: TableOptions;
  service = inject(UnitsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
    super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/unit/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/unit/delete',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'UNITS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: ['page.title', 'about.content'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'page.title',
        header: 'اسم الصفحة',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'about.content',
        header: 'عنوان التعريف',
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
        route: 'edit/',
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
