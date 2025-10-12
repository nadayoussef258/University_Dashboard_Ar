import { Routes } from '@angular/router';

export const managementsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/mangments/managements.component').then(
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
        './components/add-edit-management/add-edit-management.component'
      ).then((c) => c.AddEditManagementComponent),
    data: { pageTitle: 'تعديل ادارة', pageType: 'edit' },
  },
];
