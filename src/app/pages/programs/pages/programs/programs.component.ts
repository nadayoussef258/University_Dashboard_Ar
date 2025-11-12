import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, ProgramsService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-programs',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent extends BaseListComponent {
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
  service = inject(ProgramsService);

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
        getAll: 'v2/program/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/program/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'PROGRAMS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['pageId', 'aboutId']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
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
