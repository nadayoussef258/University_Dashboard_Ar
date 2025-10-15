import { Routes } from '@angular/router';

export const aboutRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/about/about.component').then((c) => c.AboutComponent),
    data: { pageTitle: 'نبذة عنا', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-about/add-edit-about.component').then(
        (c) => c.AddEditAboutComponent
      ),
    data: { pageTitle: 'اضافة نبذة عنا', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-about/add-edit-about.component').then(
        (c) => c.AddEditAboutComponent
      ),
    data: { pageTitle: 'تعديل نبذة عنا', pageType: 'edit' },
  },
];
