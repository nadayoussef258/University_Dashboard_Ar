import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { StorageService } from '../../services';
import { StorageKeys } from '../../enums/storage-keys';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getSession<string>(StorageKeys.AccessToken);
  const language = storageService.getSession<string>(StorageKeys.CurrentLanguage) || 'ar'; // fallback للغة افتراضية

  // ✅ تعديل الطلب فقط إذا فيه توكن
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'Accept-Language': language
      }
    });
  } else {
    // ✅ لو مفيش توكن، نضيف باقي الهيدر بدون Authorization
    req = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'Accept-Language': language
      }
    });
  }

  return next(req);
};
