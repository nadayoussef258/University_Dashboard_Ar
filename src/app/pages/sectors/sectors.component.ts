import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BaseListComponent,
  HttpService,
} from '@codekey-shared/code-key-shared-ui';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-sectors',
  imports: [],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css',
})
export class SectorsComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  tableOptions!: any;
  localize: any;
  service = inject(HttpService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.localize.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang: string) => {
        this.language = lang;
        this.initializeTableOptions();
      });
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v1/branchs/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/branchs/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SECTORS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: ['code', 'nameAr', 'nameEn'],
    };
  }

  initializeTableColumns(): any['inputCols'] {
    return [
      {
        field: 'code',
        header: 'الكود',
        filter: true,
        filterMode: 'text',
      },
      {
        field: this.language === 'ar' ? 'nameAr' : 'nameEn',
        header: 'مسمي الفرع',
        filter: true,
        filterMode: 'text',
      },
    ];
  }

  initializeTableActions(): any['inputActions'] {
    return [
      {
        name: 'Edit',
        icon: 'pi pi-file-edit',
        color: 'text-middle',
        isCallBack: true,
        call: (row: any) => {
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
    this.openDialog(
      this.service,
      this.localize.translate.instant('اضافة مسمي الفرع'),
      {
        pageType: 'add',
      }
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      this.service,
      this.localize.translate.instant('تعديل مسمي الفرع'),
      {
        pageType: 'edit',
        row: { rowData },
      }
    );
  }

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
