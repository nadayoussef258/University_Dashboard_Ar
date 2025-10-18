import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { SectorIdService } from '../../sectors/sector-id.service';

export const clearSectorIdGuard: CanActivateChildFn = (route, state) => {
  const unitIdService = inject(SectorIdService);

  // console.log('Target URL:', state.url);

  if (state.url.includes('/sector-details')) {
    unitIdService.setSectorId('');
    // console.log('🧹 Cleared unitId!');
  }

  return true;
};
