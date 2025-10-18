// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';

// export const redirectIfDirectAccessCenterGuard: CanActivateFn = (route) => {
//   const router = inject(Router);
//   const id = route.parent?.params['id'];

//   /**
//    * router.navigated === false معناها:
//    * - المستخدم عمل Refresh
//    * - أو كتب اللينك في address bar
//    */
//   if (!router.navigated && id) {
//     return router.createUrlTree([`/pages/centers/edit/${id}`]);
//   }

//   // ✅ الحالة الطبيعية (تم الوصول عبر التاب مثلاً)
//   return true;
// };

// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { CentersService } from '../../../shared';
// import { firstValueFrom } from 'rxjs';

// export const redirectIfDirectAccessCenterGuard: CanActivateFn = async (
//   route,
//   state
// ) => {
//   const router = inject(Router);
//   const centersService = inject(CentersService);

//   const id =
//     route.paramMap.get('id') ??
//     route.parent?.paramMap.get('id') ??
//     route.parent?.parent?.paramMap.get('id');

//   if (!id) return router.createUrlTree(['/notfound-404']);

//   try {
//     const center = await firstValueFrom(centersService.getCenter(id));
//     if (!center) return router.createUrlTree(['/notfound-404']);

//     // ✅ هنا الشرط المهم: لو أول مرة المستخدم يدخل التطبيق (refresh أو كتب اللينك)
//     if (!router.navigated) {
//       return router.createUrlTree([`/pages/centers/edit/${id}`]);
//     }

//     return true; // جاي من التاب أو التنقل داخل التطبيق
//   } catch {
//     return router.createUrlTree(['/notfound-404']);
//   }
// };

import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CentersService } from '../../../shared';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

function findId(route: ActivatedRouteSnapshot): string | null {
  let currentRoute: ActivatedRouteSnapshot | null = route;
  while (currentRoute) {
    const id = currentRoute.paramMap.get('id');
    if (id) return id;
    currentRoute = currentRoute.parent;
  }
  return null;
}

export const redirectIfDirectAccessCenterGuard: CanActivateFn = (
  route,
  state
) => {
  const id = findId(route);
  const router = inject(Router);
  const centersService = inject(CentersService);

  if (!id) return of(router.createUrlTree(['/notfound-404']));

  return centersService.getCenter(id).pipe(
    map((center) => {
      if (!center) return router.createUrlTree(['/notfound-404']);
      if (!router.navigated) {
        return router.createUrlTree([`/pages/centers/edit/${id}`]);
      }
      return true;
    }),
    catchError(() => of(router.createUrlTree(['/notfound-404'])))
  );
};
