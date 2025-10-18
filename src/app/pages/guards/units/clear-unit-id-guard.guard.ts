import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { UnitIdService } from '../../units/unit-id.service';

export const clearUnitIdGuard: CanActivateChildFn = (route, state) => {
  const unitIdService = inject(UnitIdService);

  const clearUnitIdRoutes = ['/unit-details', '/unit-members'];
  // console.log('Target URL:', state.url);

  if (clearUnitIdRoutes.some((route) => state.url.includes(route))) {
    unitIdService.setUnitId('');
    // console.log('🧹 Cleared unitId!');
  }

  return true;
};
