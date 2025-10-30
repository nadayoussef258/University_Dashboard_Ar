import { Routes } from '@angular/router';
import { validateManagementIdGuard, redirectOnDirectManagementAccessGuard } from '../guards/managements';

export const managementsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/management/managements.component').then((c) => c.ManagementsComponent),
    data: { pageTitle: 'PAGES.MANAGEMENTS.MAIN.PAGE_TITLE', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/managements-tabs/managements-tabs.component').then((c) => c.AddEditMainInfoManagementComponent),
    data: { pageTitle: 'PAGES.MANAGEMENTS.ADD.PAGE_TITLE', pageType: 'add' },
    children: [
      {
        path: '',
        loadComponent: () => import('./components/add-edit-management/add-edit-management.component').then((c) => c.AddEditManagementComponent),
        data: {
          pageTitle: 'PAGES.MANAGEMENTS.ADD.PAGE_TITLE',
          pageType: 'add'
        }
      }
    ]
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/managements-tabs/managements-tabs.component').then((c) => c.AddEditMainInfoManagementComponent),
    data: { pageTitle: 'PAGES.MANAGEMENTS.EDIT.PAGE_TITLE', pageType: 'edit' },
    children: [
      {
        path: '',
        canActivate: [validateManagementIdGuard],
        loadComponent: () => import('./components/add-edit-management/add-edit-management.component').then((c) => c.AddEditManagementComponent),
        data: {
          pageTitle: 'PAGES.MANAGEMENTS.EDIT.PAGE_TITLE',
          pageType: 'edit'
        }
      },
      {
        path: 'management-detail',
        canActivate: [redirectOnDirectManagementAccessGuard],
        loadChildren: () => import('./components/management-detail/management-details.routes').then((c) => c.managementDetailsRoutes),
        data: {
          pageTitle: 'PAGES.MANAGEMENT_DETAILS.MAIN.PAGE_TITLE',
          pageType: 'list'
        }
      },
      {
        path: 'management-member',
        canActivate: [redirectOnDirectManagementAccessGuard],
        loadChildren: () => import('./components/management-member/management-members.routes').then((c) => c.managementMembersRoutes),
        data: {
          pageTitle: 'PAGES.MANAGEMENT_MEMBERS.MAIN.PAGE_TITLE',
          pageType: 'list'
        }
      }
    ]
  }
];
