import { Component, inject, Input, OnChanges, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, MenuItemsService } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditMenuItemComponent } from '../../components/add-edit-menu-item/add-edit-menu-item.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-items',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.css'
})
export class MenuItemsComponent extends BaseListComponent {
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
  service = inject(MenuItemsService);

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
        getAll: 'v2/menuitems/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/menuitems/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'ACTIONS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['title', 'target', 'fragment', 'icon', 'order', 'menuType', 'parentMenuItem']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'SETTINGS.MENU_ITEMS.FORM.TITLE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'target',
        header: 'SETTINGS.MENU_ITEMS.FORM.TARGET',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'fragment',
        header: 'SETTINGS.MENU_ITEMS.FORM.FRAGMENT',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'icon',
        header: 'SETTINGS.MENU_ITEMS.FORM.ICON',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'order',
        header: 'SETTINGS.MENU_ITEMS.FORM.ORDER',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'menuType',
        header: 'SETTINGS.MENU_ITEMS.FORM.MENU_TYPE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'parentMenuItem',
        header: 'SETTINGS.MENU_ITEMS.FORM.PARENT_MENU_ITEM',
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
    this.openDialog(AddEditMenuItemComponent, this.localize.translate.instant('SETTINGS.MENU_ITEMS.ADD.PAGE_TITLE'), {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditMenuItemComponent, this.localize.translate.instant('SETTINGS.MENU_ITEMS.EDIT.PAGE_TITLE'), {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
