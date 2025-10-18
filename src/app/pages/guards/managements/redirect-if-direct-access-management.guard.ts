import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const redirectIfDirectAccessManagementGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const id = route.parent?.params['id'];

  /**
   * router.navigated === false معناها:
   * - المستخدم عمل Refresh
   * - أو كتب اللينك في address bar
   */
  if (!router.navigated && id) {
    return router.createUrlTree([`/pages/managements/edit/${id}`]);
  }

  // ✅ الحالة الطبيعية (تم الوصول عبر التاب مثلاً)
  return true;
};

// ***
// ****
//!  هذا الكود مرن اكثر في التعامل عند اضافته علي كل التابات
// export const redirectIfDirectAccessGuard: CanActivateFn = (route) => {
//   const router = inject(Router);
//   const id = route.parent?.params['id'];
//   const tabPath = route.routeConfig?.path;

//   // قائمة التابات التي نمنع الدخول المباشر لها
//   const protectedTabs = ['management-member', 'management-detail', 'mangment-attachments'];

//   if (!router.navigated && id && protectedTabs.includes(tabPath || '')) {
//     return router.createUrlTree([`/pages/managements/edit/${id}`]);
//   }

//   return true;
// };
