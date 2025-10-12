import { Routes } from '@angular/router';

export const actionsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/actions/actions.component').then(
        (c) => c.ActionsComponent
      ),
    data: { pageTitle: 'الأحداث', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-action/add-edit-action.component').then(
        (c) => c.AddEditActionComponent
      ),
    data: { pageTitle: 'اضافة حدث', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-action/add-edit-action.component').then(
        (c) => c.AddEditActionComponent
      ),
    data: { pageTitle: 'تعديل حدث', pageType: 'edit' },
  },
];
