import { Routes } from '@angular/router';
import { clearCenterIdGuard } from '../../../guards/centers/clear-center-id.guard';

export const centerMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./center-members.component').then(
        (c) => c.CenterMembersComponent,
      ),
    data: {
      pageTitle: 'PAGES.CENTER_MEMBERS.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
    canActivate: [clearCenterIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../add-edit-center-member/add-edit-center-member.component').then(
        (c) => c.AddEditCenterMemberComponent,
      ),
    data: { pageTitle: 'PAGES.CENTER_MEMBERS.ADD.PAGE_TITLE', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../add-edit-center-member/add-edit-center-member.component').then(
        (c) => c.AddEditCenterMemberComponent,
      ),
    data: {
      pageTitle: 'PAGES.CENTER_MEMBERS.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
