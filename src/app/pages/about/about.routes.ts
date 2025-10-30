import { Routes } from '@angular/router';

export const aboutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/about/about.component').then((c) => c.AboutComponent),
    data: { pageTitle: 'PAGES.ABOUT.MAIN.PAGE_TITLE', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-about/add-edit-about.component').then((c) => c.AddEditAboutComponent),
    data: { pageTitle: 'PAGES.ABOUT.ADD.PAGE_TITLE', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-about/add-edit-about.component').then((c) => c.AddEditAboutComponent),
    data: { pageTitle: 'PAGES.ABOUT.EDIT.PAGE_TITLE', pageType: 'edit' }
  }
];
