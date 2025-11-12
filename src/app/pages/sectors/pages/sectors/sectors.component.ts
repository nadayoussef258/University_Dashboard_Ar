import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { SectorsService } from '../../../../shared/services/pages/sectors/sectors/sectors.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sectors',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css'
})
export class SectorsComponent extends BaseListComponent {
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
  service = inject(SectorsService);

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
        getAll: 'v2/sectors/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectors/delete'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTORS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['name', 'subTitle', 'pageTitle', 'about.content']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'name',
        header: 'PAGES.SECTORS.FORM.NAME',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'subTitle',
        header: 'PAGES.SECTORS.FORM.SUB_TITLE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'pageTitle',
        header: 'PAGES.SHARE_FORM.PAGE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'about.content',
        header: 'PAGES.SHARE_FORM.ABOUT',
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
        isEdit: true,
        route: 'edit/',
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
}
