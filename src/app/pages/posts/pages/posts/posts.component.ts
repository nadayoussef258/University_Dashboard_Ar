import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, PostsService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditPostComponent } from '../../components/add-edit-post/add-edit-post.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-posts',

  imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, TranslatePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PagesComponent extends BaseListComponent {
  tableOptions!: TableOptions;
  service = inject(PostsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
    super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/posts/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/posts/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'POSTS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['title', 'content', 'status']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'عنوان المنشور',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'content',
        header: 'المحتوي',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'status',
        header: 'حالة المنشور',
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
    this.openDialog(AddEditPostComponent, 'اضافة منشور', {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditPostComponent, 'تعديل منشور', {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
