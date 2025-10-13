import { Routes } from '@angular/router';

export const centersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/centers/centers.component').then(
        (c) => c.CentersComponent
      ),
    data: { pageTitle: 'ادارة الصفحات والتعريف', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-center/add-edit-center.component').then(
        (c) => c.AddEditCenterComponent
      ),
    data: { pageTitle: 'اضافة مركز', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-center/add-edit-center.component').then(
        (c) => c.AddEditCenterComponent
      ),
    data: { pageTitle: 'تعديل مركز', pageType: 'edit' },
  },
];
