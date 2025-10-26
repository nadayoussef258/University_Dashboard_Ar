import {
  Injectable,
  Renderer2,
  RendererFactory2,
  signal,
  computed,
  effect,
  WritableSignal,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language, Languages } from '../../../core/enums/languages';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  //! 🔤 اللغة الافتراضية
  private defaultLang: Language = Languages.AR;

  // 🧠 إشارة تمثل اللغة الحالية (signal بدل BehaviorSubject)
  private _currentLanguage: WritableSignal<Language> = signal(this.defaultLang);

  // لو حبيت استخدم LocalStorage
  // private _currentLanguage = signal<string>(
  //   this.getStoredLanguage() || this.defaultLang,
  // );

  // 🧩 إشارة قابلة للوصول من الخارج (قراءة فقط)
  readonly currentLanguage = computed(() => this._currentLanguage());

  private renderer: Renderer2;

  constructor(
    public translate: TranslateService,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    // ✅ تنفيذ الإعدادات الأولية عند إنشاء الخدمة
    this.initLanguage();
    effect(() => {
      const lang = this._currentLanguage();
      this.applyLanguage(lang);
    });
  }

  // 🗝️ استرجاع اللغة المخزنة في localStorage (إن وجدت)
  private getStoredLanguage(): Language | null {
    return localStorage.getItem('currentLang') as Language | null;
  }

  // ⚙️ تهيئة اللغة عند تشغيل التطبيق
  private initLanguage(): void {
    const lang = this._currentLanguage() || this.defaultLang;
    this.translate.setFallbackLang(lang);
    this.translate.use(lang);
    this.handleBasicLogic(lang);
  }

  // 🔄 تبديل اللغة بين العربية والإنجليزية
  changeLanguage(): void {
    const newLang =
      this._currentLanguage() === Languages.AR ? Languages.EN : Languages.AR;
    this._currentLanguage.set(newLang);
    localStorage.setItem('currentLang', newLang);

    this.translate.use(newLang);
    this.handleBasicLogic(newLang);
  }

  // 🔍 هل اللغة الحالية إنجليزية؟
  isEnglish(): boolean {
    return this._currentLanguage() === Languages.EN;
  }

  // 🎨 تنفيذ منطق اللغة (RTL / LTR + dir + lang attribute)
  // private handleBasicLogic(lang: string): void {
  //   const html = document.querySelector('html')!;
  //   if (lang === Languages.AR) {
  //     this.renderer.addClass(document.body, 'rtl');
  //     this.renderer.removeClass(document.body, 'ltr');
  //     this.renderer.setAttribute(document.body, 'dir', 'rtl');
  //     this.renderer.setAttribute(html, 'lang', Languages.AR);
  //   } else {
  //     this.renderer.addClass(document.body, 'ltr');
  //     this.renderer.removeClass(document.body, 'rtl');
  //     this.renderer.setAttribute(document.body, 'dir', 'ltr');
  //     this.renderer.setAttribute(html, 'lang', Languages.EN);
  //   }
  // }

  // 🎨 تنفيذ منطق اللغة (RTL / LTR + dir + lang attribute)
  private handleBasicLogic(lang: Language): void {
    const html = document.documentElement;
    const body = document.body;

    const isArabic = lang === Languages.AR;
    const dir = isArabic ? 'rtl' : 'ltr';

    this.renderer.setAttribute(body, 'dir', dir);
    this.renderer.setAttribute(html, 'lang', lang);

    this.renderer.addClass(body, dir);
    this.renderer.removeClass(body, isArabic ? 'ltr' : 'rtl');
  }

  // 🌍 تطبيق اللغة على translate service
  private applyLanguage(lang: Language): void {
    this.translate.use(lang);
    this.handleBasicLogic(lang);
  }
}
