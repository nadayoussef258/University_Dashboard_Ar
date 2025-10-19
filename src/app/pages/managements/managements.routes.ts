import { Routes } from '@angular/router';
import {
  validateManagementIdGuard,
  redirectOnDirectManagementAccessGuard,
} from '../guards/managements';

export const managementsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/management/managements.component').then(
        (c) => c.ManagementsComponent
      ),
    data: { pageTitle: 'ادارة الصفحات والتعريف', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-main-info-managments/add-edit-main-info-managments.component'
      ).then((c) => c.AddEditMainInfoManagementComponent),
    data: { pageTitle: 'اضافة ادارة', pageType: 'add' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/add-edit-management/add-edit-management.component'
          ).then((c) => c.AddEditManagementComponent),
        data: { pageTitle: 'اضافة ادارة', pageType: 'add' },
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-main-info-managments/add-edit-main-info-managments.component'
      ).then((c) => c.AddEditMainInfoManagementComponent),
    data: { pageTitle: 'تعديل ادارة', pageType: 'edit' },
    children: [
      {
        path: '',
        canActivate: [validateManagementIdGuard],
        loadComponent: () =>
          import(
            './components/add-edit-management/add-edit-management.component'
          ).then((c) => c.AddEditManagementComponent),
        data: { pageTitle: 'تعديل ادارة', pageType: 'edit' },
      },
      {
        path: 'management-detail',
        canActivate: [redirectOnDirectManagementAccessGuard],
        loadChildren: () =>
          import(
            './components/management-detail/management-details.routes'
          ).then((c) => c.managementDetailsRoutes),
        data: { pageTitle: 'تفاصيل الإدارة', pageType: 'list' },
      },
      {
        path: 'management-member',
        canActivate: [redirectOnDirectManagementAccessGuard],
        loadChildren: () =>
          import(
            './components/management-member/management-members.routes'
          ).then((c) => c.managementMembersRoutes),
        data: { pageTitle: 'اعضاء الإدارة', pageType: 'list' },
      },
    ],
  },
];
