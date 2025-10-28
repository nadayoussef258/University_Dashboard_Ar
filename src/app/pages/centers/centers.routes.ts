import { Routes } from '@angular/router';
import {
  validateCenterIdGuard,
  redirectOnDirectCenterAccessGuard,
} from '../guards/centers/index';

export const centersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/centers/centers.component').then(
        (c) => c.CentersComponent,
      ),
    data: { pageTitle: 'PAGES.CENTERS.MAIN.PAGE_TITLE', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/centers-tabs/centers-tabs.component').then(
        (c) => c.CentersTabsComponent,
      ),
    data: { pageTitle: 'PAGES.CENTERS.ADD.PAGE_TITLE', pageType: 'add' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/add-edit-center/add-edit-center.component').then(
            (c) => c.AddEditCenterComponent,
          ),
        data: { pageTitle: 'PAGES.CENTERS.ADD.PAGE_TITLE', pageType: 'add' },
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/centers-tabs/centers-tabs.component').then(
        (c) => c.CentersTabsComponent,
      ),
    data: { pageTitle: 'PAGES.CENTERS.EDIT.PAGE_TITLE', pageType: 'edit' },
    children: [
      {
        path: '',
        canActivate: [validateCenterIdGuard],
        loadComponent: () =>
          import('./components/add-edit-center/add-edit-center.component').then(
            (c) => c.AddEditCenterComponent,
          ),
        data: { pageTitle: 'PAGES.CENTERS.EDIT.PAGE_TITLE', pageType: 'edit' },
      },
      {
        path: 'center-detail',
        canActivate: [redirectOnDirectCenterAccessGuard],
        loadChildren: () =>
          import('./components/center-details/center-details.routes').then(
            (c) => c.centerDetailsRoutes,
          ),
        data: {
          pageTitle: 'PAGES.CENTER_DETAILS.MAIN.PAGE_TITLE',
          pageType: 'list',
        },
      },
      {
        path: 'center-member',
        canActivate: [redirectOnDirectCenterAccessGuard],
        loadChildren: () =>
          import('./components/center-members/center-members.routes').then(
            (c) => c.centerMembersRoutes,
          ),
        data: {
          pageTitle: 'PAGES.CENTER_MEMBERS.MAIN.PAGE_TITLE',
          pageType: 'list',
        },
      },
    ],
  },
];
