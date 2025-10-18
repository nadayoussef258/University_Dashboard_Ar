import { Routes } from '@angular/router';
import { redirectIfDirectAccessManagementGuard } from '../guards/managements/redirect-if-direct-access-management.guard';

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
        './components/add-edit-management/add-edit-management.component'
      ).then((c) => c.AddEditManagementComponent),
    data: { pageTitle: 'اضافة ادارة', pageType: 'add' },
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
        loadComponent: () =>
          import(
            './components/add-edit-management/add-edit-management.component'
          ).then((c) => c.AddEditManagementComponent),
      },
      {
        path: 'management-detail',
        canActivate: [redirectIfDirectAccessManagementGuard],
        loadChildren: () =>
          import(
            './components/management-detail/management-details.routes'
          ).then((c) => c.managementDetailsRoutes),
      },
      {
        path: 'management-member',
        canActivate: [redirectIfDirectAccessManagementGuard],
        loadChildren: () =>
          import(
            './components/management-member/management-members.routes'
          ).then((c) => c.managementMembersRoutes),
      },
    ],
  },
];
