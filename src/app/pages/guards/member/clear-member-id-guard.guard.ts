import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { MemberIdService } from '../../members/member-id.service';

export const clearMemberIdGuard: CanActivateChildFn = (route, state) => {
  const memberIdService = inject(MemberIdService);

  const clearMemberIdRoutes = ['/member-details', '/member-members'];
  // console.log('Target URL:', state.url);

  if (clearMemberIdRoutes.some((route) => state.url.includes(route))) {
    memberIdService.setMemberId('');
    // console.log('🧹 Cleared memberId!');
  }

  return true;
};
