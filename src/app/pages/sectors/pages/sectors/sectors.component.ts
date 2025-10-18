import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { SectorsService } from '../../../../shared/services/pages/sectors/sectors/sectors.service';

@Component({
  selector: 'app-sectors',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css',
})
export class SectorsComponent extends BaseListComponent {
  tableOptions!: TableOptions;
  service = inject(SectorsService);

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
        getAll: 'v2/sectors/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectors/delete',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTORS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: [
        'name',
        'subTitle',
        'pageTitle',
        'about.content',
      ],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'name',
        header: 'اسم القطاع',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'subTitle',
        header: 'عنوان فرعي',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'pageTitle',
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
