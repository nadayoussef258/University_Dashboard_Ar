import { Routes } from '@angular/router';

export const servicesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/services/services.component').then((c) => c.ServicesComponent),
    data: { pageTitle: 'SETTINGS.SERVICES.MAIN.PAGE_TITLE', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-service/add-edit-service.component').then((c) => c.AddEditServiceComponent),
    data: { pageTitle: 'SETTINGS.SERVICES.ADD.PAGE_TITLE', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-service/add-edit-service.component').then((c) => c.AddEditServiceComponent),
    data: { pageTitle: 'SETTINGS.SERVICES.EDIT.PAGE_TITLE', pageType: 'edit' }
  }
];
