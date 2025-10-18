import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { UnitIdService } from '../../units/unit-id.service';

export const clearUnitIdGuard: CanActivateChildFn = (route, state) => {
  const unitIdService = inject(UnitIdService);

  // console.log('Target URL:', state.url);

  if (state.url.includes('/unit-details')) {
    unitIdService.setUnitId('');
    // console.log('🧹 Cleared unitId!');
  }

  return true;
};
