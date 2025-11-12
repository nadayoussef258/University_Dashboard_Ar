import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, PagesService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditPageComponent } from '../../components/add-edit-page/add-edit-page.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-pages',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './page-s.component.html',
  styleUrl: './page-s.component.css'
})
export class PagesComponent extends BaseListComponent {
  isEnglish = false;
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
  service = inject(PagesService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions.set({
      inputUrl: {
        getAll: 'v2/pages/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/pages/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'PAGES',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['title', 'content', 'status']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'PAGES.PAGE.FORM.TITLE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'content',
        header: 'PAGES.PAGE.FORM.CONTENT',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'status',
        header: 'PAGES.PAGE.FORM.STATUS',
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
    this.openDialog(AddEditPageComponent, this.localize.translate.instant('PAGES.PAGE.ADD.PAGE_TITLE'), { pageType: 'add' });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditPageComponent, this.localize.translate.instant('PAGES.PAGE.EDIT.PAGE_TITLE'), { pageType: 'edit', row: { rowData } });
  }
}
