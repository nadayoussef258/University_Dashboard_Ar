import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { SectorIdService } from '../../sectors/sector-id.service';

export const clearSectorIdGuard: CanActivateChildFn = (route, state) => {
  const sectorIdService = inject(SectorIdService);

  const clearSectorIdRoutes = ['/sector-details', '/sector-members', 'sector-posts', 'sector-programs', 'sector-units', 'sector-services'];
  // console.log('Target URL:', state.url);

  if (clearSectorIdRoutes.some((route) => state.url.includes(route))) {
    sectorIdService.setSectorId('');
    // console.log('🧹 Cleared sectorId!');
  }

  return true;
};
