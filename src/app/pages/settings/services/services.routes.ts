import { Routes } from '@angular/router';

export const servicesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/services/services.component').then(
        (c) => c.ServicesComponent
      ),
    data: { pageTitle: 'الخدمات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-service/add-edit-service.component').then(
        (c) => c.AddEditServiceComponent
      ),
    data: { pageTitle: 'اضافة خدمة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-service/add-edit-service.component').then(
        (c) => c.AddEditServiceComponent
      ),
    data: { pageTitle: 'تعديل خدمة', pageType: 'edit' },
  },
];
