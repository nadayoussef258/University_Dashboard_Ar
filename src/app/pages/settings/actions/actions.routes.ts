import { Routes } from '@angular/router';

export const actionsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/actions/actions.component').then(
        (c) => c.ActionsComponent,
      ),
    data: { pageTitle: 'PAGES.ACTIONS.MAIN.PAGE_TITLE', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-action/add-edit-action.component').then(
        (c) => c.AddEditActionComponent,
      ),
    data: { pageTitle: 'PAGES.ACTIONS.ADD.PAGE_TITLE', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-action/add-edit-action.component').then(
        (c) => c.AddEditActionComponent,
      ),
    data: { pageTitle: 'PAGES.ACTIONS.EDIT.PAGE_TITLE', pageType: 'edit' },
  },
];
