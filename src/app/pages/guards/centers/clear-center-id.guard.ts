import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { CenterIdService } from '../../centers/center-id.service';

export const clearCenterIdGuard: CanActivateChildFn = (route, state) => {
  const centerIdService = inject(CenterIdService);

  const clearCenterIdRoutes = ['/center-details', '/center-members'];
  // console.log('Target URL:', state.url);

  if (clearCenterIdRoutes.some((route) => state.url.includes(route))) {
    centerIdService.setCenterId('');
    // console.log('🧹 Cleared centerId!');
  }

  return true;
};
