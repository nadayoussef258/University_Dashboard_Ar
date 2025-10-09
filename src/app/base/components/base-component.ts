import { OnInit, Directive, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AlertService } from '../../core';
// import { TranslationService } from '../../shared';
import { ExportExcelService } from '../../shared/services/export-excel/export-excel.service';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  pageTitle = '';
  pageType = '';

  protected destroy$ = new Subject<boolean>();

  // Injected services
  protected alert = inject(AlertService);
  protected router = inject(Router);
  protected excel = inject(ExportExcelService);
  // protected localize = inject(TranslationService);

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = this.activatedRoute.snapshot.data['pageTitle'] || '';
    this.pageType = this.activatedRoute.snapshot.data['pageType'] || '';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
