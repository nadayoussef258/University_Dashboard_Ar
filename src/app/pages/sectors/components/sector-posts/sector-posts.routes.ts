import { Routes } from '@angular/router';

export const sectorPostsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sector-posts.component').then((c) => c.SectorPostsComponent),
    data: { pageTitle: 'منشورات القطاعات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../add-edit-sector-post/add-edit-sector-post.component').then(
        (c) => c.AddEditSectorPostComponent
      ),
    data: { pageTitle: 'اضافة منشور', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../add-edit-sector-post/add-edit-sector-post.component').then(
        (c) => c.AddEditSectorPostComponent
      ),
    data: { pageTitle: 'تعديل  منشور', pageType: 'edit' },
  },
];
