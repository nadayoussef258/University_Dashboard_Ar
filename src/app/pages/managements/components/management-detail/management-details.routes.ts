import { Routes } from '@angular/router';

export const managementDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/management-details/management-details.component').then(
        (c) => c.ManagementDetailsComponent
      ),
    data: { pageTitle: 'تفاصيل ادارة الصفحات والتعريف', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-management-detail/add-edit-management-detail.component'
      ).then((c) => c.AddEditManagementDetailComponent),
    data: { pageTitle: 'اضافة تفاصيل', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-management-detail/add-edit-management-detail.component'
      ).then((c) => c.AddEditManagementDetailComponent),
    data: { pageTitle: 'تعديل التفاصيل', pageType: 'edit' },
  },
];
