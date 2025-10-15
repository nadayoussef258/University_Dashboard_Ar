import { Routes } from '@angular/router';

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
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-main-info-managments/add-edit-main-info-managments.component'
      ).then((c) => c.AddEditMainInfoManagementComponent),
    data: { pageTitle: 'تعديل ادارة', pageType: 'edit' },
  },
];
