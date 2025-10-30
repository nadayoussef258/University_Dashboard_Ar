import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/page-s/page-s.component').then((c) => c.PagesComponent),
    data: { pageTitle: 'PAGES.PAGE.MAIN.PAGE_TITLE', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-page/add-edit-page.component').then((c) => c.AddEditPageComponent),
    data: { pageTitle: 'PAGES.PAGE.ADD.PAGE_TITLE', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-page/add-edit-page.component').then((c) => c.AddEditPageComponent),
    data: { pageTitle: 'PAGES.PAGE.EDIT.PAGE_TITLE', pageType: 'edit' }
  }
];
