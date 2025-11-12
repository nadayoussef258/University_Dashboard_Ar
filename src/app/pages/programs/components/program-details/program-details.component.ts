import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, ProgramDetailsService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { ProgramIdService } from '../../program-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-program-details',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent extends BaseListComponent {
  programId: string = '';
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);

  service = inject(ProgramDetailsService);
  programIdService = inject(ProgramIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.programId = this.programIdService.ProgramId();
    this.initializeTableOptions();
    // super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions.set({
      inputUrl: {
        getAll: 'v2/programdetail/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/programdetail/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'PROGRAM-DETAILS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: { programId: this.programId }
      },
      responsiveDisplayedProperties: ['title', 'programCategory', 'content', 'facultyId', 'programId']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'PAGES.PROGRAM_DETAILS.FORM.TITLE',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'programCategory',
        header: 'PAGES.PROGRAM_DETAILS.FORM.PROGRAM_CATEGORY',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'content',
        header: 'PAGES.PROGRAM_DETAILS.FORM.CONTENT',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'facultyId',
        header: 'PAGES.PROGRAM_DETAILS.FORM.FACULTY',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'programId',
        header: 'PAGES.SHARE_FORM.PROGRAM',
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
        route: '/pages/program-details/edit/',
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
