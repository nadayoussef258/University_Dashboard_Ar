import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProgramIdService } from '../../programs/program-id.service';

export const clearProgramIdGuard: CanActivateChildFn = (route, state) => {
  const programIdService = inject(ProgramIdService);

  const clearProgramIdRoutes = ['/program-details', '/program-members'];
  // console.log('Target URL:', state.url);

  if (clearProgramIdRoutes.some((route) => state.url.includes(route))) {
    programIdService.setProgramId('');
    // console.log('🧹 Cleared ProgramId!');
  }

  return true;
};
