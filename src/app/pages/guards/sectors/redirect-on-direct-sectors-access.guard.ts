import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const redirectOnDirectSectorAccessGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const id = route.parent?.params['id'];
  const tabPath = route.routeConfig?.path;

  // قائمة التابات التي نمنع الدخول المباشر لها
  const protectedTabs = [
    'sector-detail',
    'sector-member',
    'sector-post',
    'sector-program',
    'sector-service',
    'sector-unit',
  ];

  if (!router.navigated && id && protectedTabs.includes(tabPath || '')) {
    return router.createUrlTree([`/pages/sectors/edit/${id}`]);
  }

  return true;
};
