import { OnInit, Directive, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from './base-component';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseEditComponent
  extends BaseComponent
  implements OnInit
{
  model: any = {};
  form!: FormGroup;
  isEnglish = false;
  language: string = 'ar';
  id: string = '';
  role: any = {};
  fb = inject(FormBuilder);
  override router = inject(Router);
  protected override destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(protected override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getRouteParams();
  }

  protected getRouteParams() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
      this.pageType = 'edit';
    } else {
      this.pageType = 'add';
    }
  }

  /** Protected Methods */
  protected getUserRole(): void {
    // this.role = this.manager.GetRole();
  }

  redirect(url?: string) {
    this.router.navigate([url]);
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }
}
