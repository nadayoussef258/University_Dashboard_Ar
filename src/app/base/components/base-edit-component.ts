import { Language, Languages } from './../../core/enums/languages';
import {
  OnInit,
  Directive,
  inject,
  DestroyRef,
  effect,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from './base-component';

@Directive()
export abstract class BaseEditComponent
  extends BaseComponent
  implements OnInit
{
  /** بيانات الموديل */
  model = signal<any>({});

  /** نموذج الفورم */
  form!: FormGroup;

  /** اللغة الحالية */
  language = signal<Language>(Languages.AR);

  /** هل اللغة إنجليزية */
  isEnglish = signal(false);

  /** رقم / هوية العنصر الجاري تعديله */
  id = signal<string>('');

  /** بيانات الدور أو الصلاحيات */
  role = signal<any>({});

  /** تحكم في صلاحية التعديل */
  allowEdit: WritableSignal<boolean> = signal(false);

  /** Property for ngModel binding */
  get allowEditValue(): boolean {
    return this.allowEdit();
  }
  set allowEditValue(value: boolean) {
    this.allowEdit.set(value);
  }

  /** Dependency Injection */
  fb = inject(FormBuilder);
  override router = inject(Router);
  override destroyRef = inject(DestroyRef);

  constructor(protected override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getRouteParams();
  }

  /**
   * تأثير بسيط لتحديث حالة اللغة الإنجليزية
   * لما تتغير قيمة اللغة
   */
  change = effect(() => {
    this.isEnglish.set(this.language() === Languages.EN);
  });

  /**
   * تفعيل أو تعطيل حقل بناءً على زر التبديل
   */
  toggleEditBtn(formControl: string) {
    const control = this.form.get(formControl);
    if (this.allowEdit()) {
      control?.enable({ emitEvent: false });
    } else {
      control?.disable({ emitEvent: false });
    }
  }

  /**
   * قراءة الـ id من الـ route
   */
  protected getRouteParams() {
    const routeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (routeId) {
      this.id.set(routeId);
      this.pageType = 'edit';
    } else {
      this.pageType = 'add';
    }
  }

  /** دالة لحفظ صلاحيات المستخدم (يمكن تفعيلها لاحقاً) */
  protected getUserRole(): void {
    // this.role.set(this.manager.GetRole());
  }

  /** الانتقال لعنوان آخر */
  redirect(url?: string) {
    this.router.navigate([url]);
  }

  /** منع الحدث الافتراضي */
  preventDefault(event: Event) {
    event.preventDefault();
  }

  isLeader = {
    leaderStyle: 'bg-blue-100 text-blue-700 border-blue-300',
    personStyle: 'bg-gray-100 text-gray-600 border-gray-300',
    leaderIcon: 'pi pi-star text-blue-500',
    personIcon: 'pi pi-user text-gray-500',
  };
}
