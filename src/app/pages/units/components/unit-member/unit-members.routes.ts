import { Routes } from '@angular/router';

export const unitMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./unit-members.component').then((c) => c.UnitMembersComponent),
    data: { pageTitle: 'أعضاء الوحدات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../add-edit-unit-member/add-edit-unit-member.component').then(
        (c) => c.AddEditUnitMemberComponent
      ),
    data: { pageTitle: 'اضافة عضو للوحدة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../add-edit-unit-member/add-edit-unit-member.component').then(
        (c) => c.AddEditUnitMemberComponent
      ),
    data: { pageTitle: 'تعديل عضو الوحدة', pageType: 'edit' },
  },
];
