import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  AboutService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditLeaderComponent } from '../../components/add-edit-leader/add-edit-leader.component';
import { LeadersService } from '../../../../shared/services/pages/leaders/leaders.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-leaders',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
    TranslatePipe,
  ],
  templateUrl: './leaders.component.html',
  styleUrl: './leaders.component.css',
})
export class LeaderComponent extends BaseListComponent {
  tableOptions!: TableOptions;
  service = inject(LeadersService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/leaders/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/leaders/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'ABOUT',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: ['fullName', 'position', 'mamberName'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'fullName',
        header: 'الاسم بالكامل',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'position',
        header: 'المنصب',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'mamberName',
        header: 'اسم عضو هيئة التدريس',
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
    this.openDialog(AddEditLeaderComponent, 'اضافة بيانات القائد', {
      pageType: 'add',
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditLeaderComponent, 'تعديل بيانات القائد', {
      pageType: 'edit',
      row: { rowData },
    });
  }
}
