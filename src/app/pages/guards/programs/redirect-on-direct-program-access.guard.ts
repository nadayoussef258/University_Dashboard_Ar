import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const redirectOnDirectProgramAccessGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const id = route.parent?.params['id'];

  if (!router.navigated && id) {
    return router.createUrlTree([`/pages/programs/edit/${id}`]);
  }

  return true;
};
