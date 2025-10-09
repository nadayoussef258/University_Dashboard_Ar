import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        (c) => c.CategoriesComponent
      ),
    data: { pageTitle: 'التصنيفات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-category/add-edit-category.component').then(
        (c) => c.AddEditCategoryComponent
      ),
    data: { pageTitle: 'اضافة تصنيف', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-category/add-edit-category.component').then(
        (c) => c.AddEditCategoryComponent
      ),
    data: { pageTitle: 'تعديل تصنيف', pageType: 'edit' },
  },
];
