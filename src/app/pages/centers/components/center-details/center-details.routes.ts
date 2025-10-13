import { Routes } from '@angular/router';

export const centerDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/center-details/center-details.component').then(
        (c) => c.CenterDetailsComponent
      ),
    data: { pageTitle: 'تفاصيل المراكز', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-center-detail/add-edit-center-detail.component'
      ).then((c) => c.AddEditCenterDetailComponent),
    data: { pageTitle: 'اضافة تفاصيل للمركز', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-center-detail/add-edit-center-detail.component'
      ).then((c) => c.AddEditCenterDetailComponent),
    data: { pageTitle: 'تعديل تفاصيل المركز', pageType: 'edit' },
  },
];
