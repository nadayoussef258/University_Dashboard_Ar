import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, AboutService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditAboutComponent } from '../../components/add-edit-about/add-edit-about.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  providers: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent extends BaseListComponent {
  tableOptions!: TableOptions;
  service = inject(AboutService);

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
        getAll: 'v2/about/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/about/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'ABOUT',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['pageTitle', 'content', 'mission', 'vision', 'history']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'pageName',
        header: 'PAGES.ABOUT.FORM.PAGE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'content',
        header: 'PAGES.ABOUT.FORM.CONTENT',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'mission',
        header: 'PAGES.ABOUT.FORM.MISSION',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'vision',
        header: 'PAGES.ABOUT.FORM.VISION',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'history',
        header: 'PAGES.ABOUT.FORM.HISTORY',
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
    this.openDialog(AddEditAboutComponent, this.localize.translate.instant('PAGES.ABOUT.ADD.PAGE_TITLE'), {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditAboutComponent, this.localize.translate.instant('PAGES.ABOUT.EDIT.PAGE_TITLE'), {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
