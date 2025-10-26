import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { AR_TRANSLATIONS } from '../../../../assets/i18n/ar/main-ar-ngx-translate';
import { EN_TRANSLATIONS } from '../../../../assets/i18n/en/main-en-ngx-translate';
import { Languages } from '../../../core/enums/languages';

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    switch (lang) {
      case Languages.AR:
        return of(AR_TRANSLATIONS);
      case Languages.EN:
        return of(EN_TRANSLATIONS);
      default:
        return of(AR_TRANSLATIONS); // fallback
    }
  }
}
