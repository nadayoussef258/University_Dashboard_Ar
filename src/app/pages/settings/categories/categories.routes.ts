import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        (c) => c.CategoriesComponent,
      ),
    data: {
      pageTitle: 'SETTINGS.CATEGORIES.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-category/add-edit-category.component').then(
        (c) => c.AddEditCategoryComponent,
      ),
    data: { pageTitle: 'SETTINGS.CATEGORIES.ADD.PAGE_TITLE', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-category/add-edit-category.component').then(
        (c) => c.AddEditCategoryComponent,
      ),
    data: {
      pageTitle: 'SETTINGS.CATEGORIES.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
