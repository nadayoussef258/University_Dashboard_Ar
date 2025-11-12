import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, CentersService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-centers',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './centers.component.html',
  styleUrl: './centers.component.css'
})
export class CentersComponent extends BaseListComponent {
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
  service = inject(CentersService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
    // super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions.set({
      inputUrl: {
        getAll: 'v2/center/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/center/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'CENTERS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['subTitle', 'place', 'pageId', 'aboutId']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'subTitle',
        header: 'PAGES.CENTERS.FORM.SUB_TITLE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'place',
        header: 'PAGES.CENTERS.FORM.PLACE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'pageId',
        header: 'PAGES.SHARE_FORM.PAGE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'aboutId',
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
