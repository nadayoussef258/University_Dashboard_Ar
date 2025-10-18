import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const redirectIfDirectAccessUnitGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const id = route.parent?.params['id'];

  /**
   * router.navigated === false معناها:
   * - المستخدم عمل Refresh
   * - أو كتب اللينك في address bar
   */
  if (!router.navigated && id) {
    return router.createUrlTree([`/pages/units/edit/${id}`]);
  }

  return true;
};
