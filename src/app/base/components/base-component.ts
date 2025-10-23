import {
  OnInit,
  Directive,
  OnDestroy,
  inject,
  DestroyRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; // ✅ لإدارة الاشتراكات تلقائيًا
import { AlertService } from '../../core';
import { ExportExcelService } from '../../shared/services/export-excel/export-excel.service';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  pageTitle = '';
  pageType = '';

  // ✅ بديل للـ Subject التقليدي لإدارة عمر الاشتراكات والـ effects
  protected destroyRef = inject(DestroyRef);

  protected alert = inject(AlertService);
  protected router = inject(Router);
  protected excel = inject(ExportExcelService);

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // 🔹 جلب بيانات الصفحة من الـ route data
    this.pageTitle = this.activatedRoute.snapshot.data['pageTitle'] || '';
    this.pageType = this.activatedRoute.snapshot.data['pageType'] || '';
  }

  ngOnDestroy(): void {
    // ✅ مش محتاج تبعت next أو complete زي زمان
    // Angular بيهندل التدمير تلقائيًا مع DestroyRef
  }
}
