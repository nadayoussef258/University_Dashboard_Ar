import { Routes } from '@angular/router';

export const managementMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/management-members/management-members.component').then(
        (c) => c.ManagementMembersComponent
      ),
    data: { pageTitle: 'أعضاء الإدارات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-member/add-edit-management-member.component'
      ).then((c) => c.AddManagementMemberComponent),
    data: { pageTitle: 'اضافة عضو للإدارة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-member/add-edit-management-member.component'
      ).then((c) => c.AddManagementMemberComponent),
    data: { pageTitle: 'تعديل عضو الإدارة', pageType: 'edit' },
  },
];
