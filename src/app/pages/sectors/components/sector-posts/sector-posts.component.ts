import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  SectorsService,
} from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditSectorPostComponent } from '../add-edit-sector-post/add-edit-sector-post.component';
import { SectorIdService } from '../../sector-id.service';

@Component({
  selector: 'app-sector-post',

  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './sector-posts.component.html',
  styleUrl: './sector-posts.component.css',
})
export class SectorPostsComponent extends BaseListComponent {
  sectorId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(SectorsService);
  sectorIdService = inject(SectorIdService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
    super.ngOnInit();

    this.sectorId = this.sectorIdService.SectortId();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/sectorposts/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/sectorposts/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTOR-POSTS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: { sectorId: this.sectorId },
      },
      responsiveDisplayedProperties: ['sectorId', 'postId'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'sectorId',
        header: 'القطاع',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'postId',
        header: 'المنشور',
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
    this.openDialog(AddEditSectorPostComponent, 'اضافة منشور', {
      pageType: 'add',
      row: { sectorId: this.sectorId },
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditSectorPostComponent, 'تعديل منشور', {
      pageType: 'edit',
      row: { rowData },
    });
  }

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
