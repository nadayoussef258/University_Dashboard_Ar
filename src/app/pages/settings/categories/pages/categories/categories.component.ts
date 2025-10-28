import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  CategoriesService,
} from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditCategoryComponent } from '../../components/add-edit-category/add-edit-category.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    TranslatePipe,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(CategoriesService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v1/categories/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/categories/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'ADVISOR-SYSTEM-EXPERIENCES',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: ['code', 'name'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'code',
        header: 'PAGES.CATEGORIES.FORM.CODE',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'name',
        header: 'PAGES.CATEGORIES.FORM.NAME',
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
        isCallBack: true,
        call: (row) => {
          this.openEdit(row);
        },
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

  openAdd() {
    this.openDialog(
      AddEditCategoryComponent,
      this.localize.translate.instant('PAGES.CATEGORIES.ADD.PAGE_TITLE'),
      {
        pageType: 'add',
      },
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      AddEditCategoryComponent,
      this.localize.translate.instant('PAGES.CATEGORIES.EDIT.PAGE_TITLE'),
      {
        pageType: 'edit',
        row: { rowData },
      },
    );
  }
}
