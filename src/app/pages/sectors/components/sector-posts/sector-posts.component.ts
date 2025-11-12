import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, SectorsService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditSectorPostComponent } from '../add-edit-sector-post/add-edit-sector-post.component';
import { SectorIdService } from '../../sector-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sector-post',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './sector-posts.component.html',
  styleUrl: './sector-posts.component.css'
})
export class SectorPostsComponent extends BaseListComponent {
  sectorId: string = '';
  isEnglish = false;
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({} as TableOptions);
  service = inject(SectorsService);
  sectorIdService = inject(SectorIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.sectorId = this.sectorIdService.SectortId();
    this.initializeTableOptions();
    super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions.set({
      inputUrl: {
        getAll: 'v2/sectorposts/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectorposts/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTOR-POSTS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: { sectorId: this.sectorId }
      },
      responsiveDisplayedProperties: ['sectorId', 'postId']
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'sectorId',
        header: 'PAGES.SHARE_FORM.SECTOR',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'postId',
        header: 'PAGES.SHARE_FORM.POST',
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
    this.openDialog(AddEditSectorPostComponent, this.localize.translate.instant('PAGES.SECTOR_POSTS.ADD.PAGE_TITLE'), { pageType: 'add', row: { sectorId: this.sectorId } });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditSectorPostComponent, this.localize.translate.instant('PAGES.SECTOR_POSTS.EDIT.PAGE_TITLE'), { pageType: 'edit', row: { rowData } });
  }
}
