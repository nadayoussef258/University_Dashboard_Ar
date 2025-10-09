import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  PrimeDataTableComponent,
  PrimeTitleToolBarComponent,
  PagesService,
  CategoriesService,
} from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { takeUntil } from 'rxjs';
import { AddEditCategoryComponent } from '../../components/add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    RouterModule,
    CardModule,
    PrimeDataTableComponent,
    PrimeTitleToolBarComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent
  extends BaseListComponent
  implements AfterViewInit
{
  @Input() employeeId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(CategoriesService);

  constructor(activatedRoute: ActivatedRoute, private el: ElementRef) {
    super(activatedRoute);
  }

  ngAfterViewInit() {
    const eyes = this.el.nativeElement.querySelectorAll(
      '#eye-left, #eye-right'
    );
    const mouth = this.el.nativeElement.querySelector('#mouth');
    const emailInput = this.el.nativeElement.querySelector(
      '#email'
    ) as HTMLInputElement;
    const passwordInput = this.el.nativeElement.querySelector(
      '#password'
    ) as HTMLInputElement;
    const loginBtn = this.el.nativeElement.querySelector(
      '#login-btn'
    ) as HTMLButtonElement;

    // 👁️ تحريك العيون مع الماوس
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      eyes.forEach((eye: any) => {
        eye.setAttribute('transform', `translate(${x}, ${y})`);
      });
    });

    // 😲 دهشة عند كتابة الإيميل
    emailInput?.addEventListener('focus', () => {
      mouth?.setAttribute('d', 'M80,115 Q100,135 120,115');
    });
    emailInput?.addEventListener('blur', () => {
      mouth?.setAttribute('d', 'M80,115 Q100,125 120,115');
    });

    // 🙈 غلق العيون عند كتابة الباسورد
    passwordInput?.addEventListener('focus', () => {
      eyes.forEach((eye: any) => eye.setAttribute('r', '2'));
    });
    passwordInput?.addEventListener('blur', () => {
      eyes.forEach((eye: any) => eye.setAttribute('r', '6'));
      mouth?.setAttribute('d', 'M80,115 Q100,125 120,115');
    });

    // 😢 حزن لو باسورد غلط
    loginBtn?.addEventListener('click', () => {
      if (passwordInput.value !== '1234') {
        mouth?.setAttribute('d', 'M80,120 Q100,105 120,120');
      } else {
        mouth?.setAttribute('d', 'M80,115 Q100,135 120,115');
      }
    });
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
        getAll: 'v1/categories/getPaged',
        getAllMethod: 'POST',
        delete: 'v2/categories/deletesoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'ADVISOR-SYSTEM-EXPERIENCES',
        allowAll: true,
        listOfPermissions: [],
      },
      bodyOptions: {
        filter: {},
      },
      responsiveDisplayedProperties: ['code', 'nameAr'],
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'code',
        header: 'الكــود',
        filter: true,
        filterMode: 'text',
      },
      {
        field: 'nameAr',
        header: 'اسم التصنيف',
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
      AddEditCategoryComponent,
      // this.localize.translate.instant('اضافة قسم'),
      'اضافة تصنيف',
      {
        pageType: 'add',
      }
    );
  }

  openEdit(rowData: any) {
    this.openDialog(
      AddEditCategoryComponent,
      // this.localize.translate.instant('تعديل قسم'),
      'تعديل تصنيف',
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
    this.destroy$.complete();
  }
}
