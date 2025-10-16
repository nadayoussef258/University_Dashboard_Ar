import { Routes } from '@angular/router';

export const managementDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./management-details.component').then(
        (c) => c.ManagementDetailsComponent
      ),
    data: { pageTitle: 'تفاصيل الإدارات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        '../add-edit-management-detail/add-edit-management-detail.component'
      ).then((c) => c.AddEditManagementDetailComponent),
    data: { pageTitle: 'اضافة تفاصيل للإدارة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../add-edit-management-detail/add-edit-management-detail.component'
      ).then((c) => c.AddEditManagementDetailComponent),
    data: { pageTitle: 'تعديل تفاصيل الإدارة', pageType: 'edit' },
  },
];
