import { Routes } from '@angular/router';

export const logosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/logos/logos.component').then((c) => c.LogosComponent),
    data: { pageTitle: 'لوجو الجامعة', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-logo/add-edit-logo.component').then(
        (c) => c.AddEditLogoComponent
      ),
    data: { pageTitle: 'اضافة لوجو الجامعة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-logo/add-edit-logo.component').then(
        (c) => c.AddEditLogoComponent
      ),
    data: { pageTitle: 'تعديل لوجو الجامعة', pageType: 'edit' },
  },
];
