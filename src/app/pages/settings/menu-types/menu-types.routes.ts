import { Routes } from '@angular/router';

export const menuTypesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/menu-types/menu-types.component').then(
        (c) => c.MenuTypesComponent
      ),
    data: { pageTitle: 'أنواع القوائم', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-menu-type/add-edit-menu-type.component'
      ).then((c) => c.AddEditMenuTypeComponent),
    data: { pageTitle: 'اضافة حدث القائمة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-menu-type/add-edit-menu-type.component'
      ).then((c) => c.AddEditMenuTypeComponent),
    data: { pageTitle: 'تعديل نوع القائمة', pageType: 'edit' },
  },
];
