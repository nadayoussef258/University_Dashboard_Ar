import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { ManagmentIdService } from '../../managements/managment-id.service';

export const clearManagementIdGuard: CanActivateChildFn = (route, state) => {
  const managmentIdService = inject(ManagmentIdService);

  // console.log('Target URL:', state.url);

  if (state.url.includes('/management-details')) {
    managmentIdService.setManagementId('');
    // console.log('🧹 Cleared managementId!');
  }

  return true;
};
