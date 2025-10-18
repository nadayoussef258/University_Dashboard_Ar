import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { ManagmentIdService } from '../../managements/managment-id.service';

export const clearManagementIdGuard: CanActivateChildFn = (route, state) => {
  const managmentIdService = inject(ManagmentIdService);

  const clearManagementIdRoutes = [
    '/management-details',
    '/management-members',
  ];
  // console.log('Target URL:', state.url);

  if (clearManagementIdRoutes.some((route) => state.url.includes(route))) {
    managmentIdService.setManagementId('');
    // console.log('🧹 Cleared managementId!');
  }

  return true;
};
