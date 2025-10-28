import { validateMemberIdGuard } from './../guards/member/validate-member-id.guard';
import { Routes } from '@angular/router';

export const membersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/members/members.component').then(
        (c) => c.MembersComponent,
      ),
    data: { pageTitle: 'PAGES.MEMBERS.MAIN.PAGE_TITLE', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/members-tabs/members-tabs.component').then(
        (c) => c.MembersTabsComponent,
      ),
    data: { pageTitle: 'PAGES.MEMBERS.ADD.PAGE_TITLE', pageType: 'add' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/add-edit-member/add-edit-member.component').then(
            (c) => c.AddEditMemberComponent,
          ),
        data: { pageTitle: 'PAGES.MEMBERS.ADD.PAGE_TITLE', pageType: 'add' },
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/members-tabs/members-tabs.component').then(
        (c) => c.MembersTabsComponent,
      ),
    data: { pageTitle: 'PAGES.MEMBERS.EDIT.PAGE_TITLE', pageType: 'edit' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/add-edit-member/add-edit-member.component').then(
            (c) => c.AddEditMemberComponent,
          ),
        data: { pageTitle: 'PAGES.MEMBERS.EDIT.PAGE_TITLE', pageType: 'add' },
        canActivate: [validateMemberIdGuard],
      },
    ],
  },
];
