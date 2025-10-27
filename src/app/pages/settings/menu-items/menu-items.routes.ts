import { Routes } from '@angular/router';

export const menuItemsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/menu-items/menu-items.component').then(
        (c) => c.MenuItemsComponent,
      ),
    data: {
      pageTitle: 'SETTINGS.MENU_ITEMS.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-menu-item/add-edit-menu-item.component'
      ).then((c) => c.AddEditMenuItemComponent),
    data: { pageTitle: 'SETTINGS.MENU_ITEMS.ADD.PAGE_TITLE', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-menu-item/add-edit-menu-item.component'
      ).then((c) => c.AddEditMenuItemComponent),
    data: {
      pageTitle: 'SETTINGS.MENU_ITEMS.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
