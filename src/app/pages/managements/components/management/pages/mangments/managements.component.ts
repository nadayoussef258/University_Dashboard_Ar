import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  ActionsService,
  ManagementsService,
} from '../../../../../../shared';
import { TableOptions } from '../../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../../base/components/base-list-component';
import { takeUntil } from 'rxjs';
import { AddEditManagementComponent } from '../../components/add-edit-management/add-edit-management.component';

@Component({
  selector: 'app-managements',
  standalone: true,
  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './managements.component.html',
  styleUrl: './managements.component.css',
})
export class ManagementsComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(ManagementsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v1/management/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/management/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'MANAGEMENTS',
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
    this.openDialog(AddEditManagementComponent, 'اضافة ادارة ', {
      pageType: 'add',
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditManagementComponent, 'تعديل ادارة', {
      pageType: 'edit',
      row: { rowData },
    });
  }

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
