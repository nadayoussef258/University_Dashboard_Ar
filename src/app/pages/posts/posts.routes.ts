import { Routes } from '@angular/router';

export const postsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/posts/posts.component').then((c) => c.PagesComponent),
    data: { pageTitle: 'المنشورات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-post/add-edit-post.component').then(
        (c) => c.AddEditPostComponent
      ),
    data: { pageTitle: 'اضافة منشور', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-post/add-edit-post.component').then(
        (c) => c.AddEditPostComponent
      ),
    data: { pageTitle: 'تعديل منشور', pageType: 'edit' },
  },
];
