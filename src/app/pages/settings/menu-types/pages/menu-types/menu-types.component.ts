import { Component, inject, Input, OnChanges, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, MenutypesService } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditMenuTypeComponent } from '../../components/add-edit-menu-type/add-edit-menu-type.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-types',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './menu-types.component.html',
  styleUrl: './menu-types.component.css'
})
export class MenuTypesComponent extends BaseListComponent {
  isEnglish = false;
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
  service = inject(MenutypesService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
    super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions.set({
      inputUrl: {
        getAll: 'v2/menutype/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/menutype/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'MENU-TYPES',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['type']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'type',
        header: 'SETTINGS.MENU_TYPES.FORM.TYPE',
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
        isCallBack: true,
        call: (row) => {
          this.openEdit(row);
        },
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

  openAdd() {
    this.openDialog(AddEditMenuTypeComponent, this.localize.translate.instant('SETTINGS.MENU_TYPES.ADD.PAGE_TITLE'), {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditMenuTypeComponent, this.localize.translate.instant('SETTINGS.MENU_TYPES.EDIT.PAGE_TITLE'), {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
