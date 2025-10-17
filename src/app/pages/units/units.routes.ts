import { Routes } from '@angular/router';

export const unitsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/units/units.component').then((c) => c.UnitsComponent),
    data: { pageTitle: 'الوحدات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-main-info-unit/add-edit-main-info-unit.component'
      ).then((c) => c.AddEditMainInfoUnitComponent),
    data: { pageTitle: 'اضافة وحدة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-main-info-unit/add-edit-main-info-unit.component'
      ).then((c) => c.AddEditMainInfoUnitComponent),
    data: { pageTitle: 'تعديل الوحدة', pageType: 'edit' },
  },
];
