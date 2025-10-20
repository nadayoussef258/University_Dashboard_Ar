import { validateMemberIdGuard } from './../guards/member/validate-member-id.guard';
import { Routes } from '@angular/router';

export const membersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/members/members.component').then(
        (c) => c.MembersComponent
      ),
    data: { pageTitle: 'أعضاء هيئة التدريس', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/members-tabs/members-tabs.component').then(
        (c) => c.MembersTabsComponent
      ),
    data: { pageTitle: 'اضافة عضو هيئة تدريس', pageType: 'add' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/add-edit-member/add-edit-member.component').then(
            (c) => c.AddEditMemberComponent
          ),
        data: { pageTitle: 'اضافة عضو هيئة تدريس', pageType: 'add' },
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/members-tabs/members-tabs.component').then(
        (c) => c.MembersTabsComponent
      ),
    data: { pageTitle: 'تعديل هيئة تدريس', pageType: 'edit' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/add-edit-member/add-edit-member.component').then(
            (c) => c.AddEditMemberComponent
          ),
        data: { pageTitle: 'تعديل عضو هيئة تدريس', pageType: 'add' },
        canActivate: [validateMemberIdGuard],
      },
    ],
  },
];
