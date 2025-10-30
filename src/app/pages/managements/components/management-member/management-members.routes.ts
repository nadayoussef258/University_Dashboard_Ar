import { Routes } from '@angular/router';
import { clearManagementIdGuard } from '../../../guards/managements/clear-management-id-guard.guard';

export const managementMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./management-members.component').then((c) => c.ManagementMembersComponent),
    data: {
      pageTitle: 'PAGES.MANAGEMENT_MEMBERS.MAIN.PAGE_TITLE',
      pageType: 'list'
    },
    canActivate: [clearManagementIdGuard]
  },
  {
    path: 'add',
    loadComponent: () => import('../add-edit-management-member/add-edit-management-member.component').then((c) => c.AddEditManagementMemberComponent),
    data: {
      pageTitle: 'PAGES.MANAGEMENT_MEMBERS.ADD.PAGE_TITLE',
      pageType: 'add'
    }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../add-edit-management-member/add-edit-management-member.component').then((c) => c.AddEditManagementMemberComponent),
    data: {
      pageTitle: 'PAGES.MANAGEMENT_MEMBERS.EDIT.PAGE_TITLE',
      pageType: 'edit'
    }
  }
];
