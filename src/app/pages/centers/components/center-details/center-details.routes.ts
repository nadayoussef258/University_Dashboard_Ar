import { Routes } from '@angular/router';
import { clearCenterIdGuard } from '../../../guards/centers/clear-center-id.guard';

export const centerDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./center-details.component').then(
        (c) => c.CenterDetailsComponent,
      ),
    data: {
      pageTitle: 'PAGES.CENTER_DETAILS.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
    canActivate: [clearCenterIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../add-edit-center-detail/add-edit-center-detail.component').then(
        (c) => c.AddEditCenterDetailComponent,
      ),
    data: { pageTitle: 'PAGES.CENTER_DETAILS.ADD.PAGE_TITLE', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../add-edit-center-detail/add-edit-center-detail.component').then(
        (c) => c.AddEditCenterDetailComponent,
      ),
    data: {
      pageTitle: 'PAGES.CENTER_DETAILS.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
