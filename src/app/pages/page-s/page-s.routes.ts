import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/page-s/page-s.component').then((c) => c.PagesComponent),
    data: { pageTitle: 'الصفحات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-page/add-edit-page.component').then(
        (c) => c.AddEditPageComponent
      ),
    data: { pageTitle: 'اضافة صفحة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-page/add-edit-page.component').then(
        (c) => c.AddEditPageComponent
      ),
    data: { pageTitle: 'تعديل صفحة', pageType: 'edit' },
  },
];
