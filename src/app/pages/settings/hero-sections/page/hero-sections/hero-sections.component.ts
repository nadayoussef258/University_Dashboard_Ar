import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  ContactsService,
  HeroSectionsService,
} from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { takeUntil } from 'rxjs';
import { AddEditHeroSectionComponent } from '../../components/add-edit-hero-section/add-edit-hero-section.component';

@Component({
  selector: 'app-hero-sections',
  standalone: true,
  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './hero-sections.component.html',
  styleUrl: './hero-sections.component.css',
})
export class HeroSectionsComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(HeroSectionsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    // this.localize.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
    //     this.language = lang;
    // });
    this.initializeTableOptions();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v2/herosections/getPaged',
        getAllMethod: 'POST',
        delete: 'v1/herosections/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'HERO-SECTIONS',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: ['title', 'subTitle', 'description'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'title',
        header: 'العنوان الرئيسي',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'subTitle',
        header: 'العنوان الفرعي',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'description',
        header: 'الوصف',
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
    this.openDialog(
      AddEditHeroSectionComponent,
      // this.localize.translate.instant('اضافة قسم'),
      'اضافة الواجهة الرئيسية',
      {
        pageType: 'add',
      }
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      AddEditHeroSectionComponent,
      // this.localize.translate.instant('تعديل قسم'),
      'تعديل الواجهة الرئيسية',
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
