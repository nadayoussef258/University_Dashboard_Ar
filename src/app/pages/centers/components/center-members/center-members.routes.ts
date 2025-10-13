import { Routes } from '@angular/router';

export const centerMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/center-members/center-members.component').then(
        (c) => c.CenterMembersComponent
      ),
    data: { pageTitle: 'أعضاء المراكز', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-center-member/add-edit-center-member.component'
      ).then((c) => c.AddEditCenterMemberComponent),
    data: { pageTitle: 'اضافة عضو للمركز', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-center-member/add-edit-center-member.component'
      ).then((c) => c.AddEditCenterMemberComponent),
    data: { pageTitle: 'تعديل عضو', pageType: 'edit' },
  },
];
