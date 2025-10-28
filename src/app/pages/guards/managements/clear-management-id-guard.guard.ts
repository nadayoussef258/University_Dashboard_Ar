import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { ManagementIdService } from '../../managements/management-id.service';

export const clearManagementIdGuard: CanActivateChildFn = (route, state) => {
  const managementIdService = inject(ManagementIdService);

  const clearManagementIdRoutes = [
    '/management-details',
    '/management-members',
  ];
  // console.log('Target URL:', state.url);

  if (clearManagementIdRoutes.some((route) => state.url.includes(route))) {
    managementIdService.setManagementId('');
    // console.log('🧹 Cleared managementId!');
  }

  return true;
};
