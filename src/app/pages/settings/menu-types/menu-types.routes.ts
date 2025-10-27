import { Routes } from '@angular/router';

export const menuTypesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/menu-types/menu-types.component').then(
        (c) => c.MenuTypesComponent,
      ),
    data: {
      pageTitle: 'SETTINGS.MENU_TYPES.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-menu-type/add-edit-menu-type.component'
      ).then((c) => c.AddEditMenuTypeComponent),
    data: { pageTitle: 'SETTINGS.MENU_TYPES.ADD.PAGE_TITLE', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-menu-type/add-edit-menu-type.component'
      ).then((c) => c.AddEditMenuTypeComponent),
    data: {
      pageTitle: 'SETTINGS.MENU_TYPES.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
