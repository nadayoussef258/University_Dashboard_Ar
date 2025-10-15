import { Routes } from '@angular/router';

export const menuItemsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/menu-items/menu-items.component').then(
        (c) => c.MenuItemsComponent
      ),
    data: { pageTitle: 'عناصر القوائم', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-menu-item/add-edit-menu-item.component'
      ).then((c) => c.AddEditMenuItemComponent),
    data: { pageTitle: 'اضافة عنصر القائمة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-menu-item/add-edit-menu-item.component'
      ).then((c) => c.AddEditMenuItemComponent),
    data: { pageTitle: 'تعديل عنصر القائمة', pageType: 'edit' },
  },
];
