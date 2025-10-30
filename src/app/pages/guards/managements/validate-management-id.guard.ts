import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ManagementsService } from '../../../shared';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * ✅ يتحقق من وجود Management ID في الـ route
 * وإذا غير صالح أو غير موجود → يعيد التوجيه لصفحة notfound
 */
export const validateManagementIdGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean | import('@angular/router').UrlTree> => {
  const router = inject(Router);
  const managementsService = inject(ManagementsService);

  // 🔹 استخراج id مباشرة من المسار
  const id = route.paramMap.get('id');

  // 🔸 لو الـ id مفقود → إعادة توجيه
  if (!id) {
    return of(router.createUrlTree(['/notfound-404']));
  }

  // ✅ تحقق من وجود الـ Management
  return managementsService.getManagement(id).pipe(
    map((management) => {
      // 🔸 لو غير موجود → توجيه إلى notfound
      if (!management) return router.createUrlTree(['/notfound-404']);
      return true; // ✅ صالح، اسمح بالوصول
    }),
    catchError(() => of(router.createUrlTree(['/notfound-404']))) // 🧱 في حال خطأ في الـ API
  );
};
