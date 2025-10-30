import { Routes } from '@angular/router';
import { clearSectorIdGuard } from '../../../guards/sectors/clear-sector-id-sector.guard';

export const sectorPostsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./sector-posts.component').then((c) => c.SectorPostsComponent),
    data: { pageTitle: 'PAGES.SECTOR_POSTS.MAIN.PAGE_TITLE', pageType: 'list' },
    canActivate: [clearSectorIdGuard]
  },
  {
    path: 'add',
    loadComponent: () => import('../add-edit-sector-post/add-edit-sector-post.component').then((c) => c.AddEditSectorPostComponent),
    data: { pageTitle: 'PAGES.SECTOR_POSTS.ADD.PAGE_TITLE', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../add-edit-sector-post/add-edit-sector-post.component').then((c) => c.AddEditSectorPostComponent),
    data: { pageTitle: 'PAGES.SECTOR_POSTS.EDIT.PAGE_TITLE', pageType: 'edit' }
  }
];
