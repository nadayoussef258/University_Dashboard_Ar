import { Routes } from '@angular/router';
import { clearCenterIdGuard } from '../../../guards/centers/clear-center-id.guard';

export const centerMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./center-members.component').then(
        (c) => c.CenterMembersComponent
      ),
    data: { pageTitle: 'أعضاء المراكز', pageType: 'list' },
    canActivate: [clearCenterIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../add-edit-center-member/add-edit-center-member.component').then(
        (c) => c.AddEditCenterMemberComponent
      ),
    data: { pageTitle: 'اضافة عضو للمركز', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../add-edit-center-member/add-edit-center-member.component').then(
        (c) => c.AddEditCenterMemberComponent
      ),
    data: { pageTitle: 'تعديل عضو', pageType: 'edit' },
  },
];
