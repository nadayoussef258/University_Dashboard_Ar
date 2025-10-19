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
        (c) => c.CentersComponent
      ),
    data: { pageTitle: 'المراكز', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/centers-tabs/centers-tabs.component').then(
        (c) => c.CentersTabsComponent
      ),
    data: { pageTitle: 'إضافة مركز', pageType: 'add' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/add-edit-center/add-edit-center.component').then(
            (c) => c.AddEditCenterComponent
          ),
        data: { pageTitle: 'إضافة مركز', pageType: 'add' },
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/centers-tabs/centers-tabs.component').then(
        (c) => c.CentersTabsComponent
      ),
    data: { pageTitle: 'تعديل مركز', pageType: 'edit' },
    children: [
      {
        path: '',
        canActivate: [validateCenterIdGuard],
        loadComponent: () =>
          import('./components/add-edit-center/add-edit-center.component').then(
            (c) => c.AddEditCenterComponent
          ),
        data: { pageTitle: 'تعديل مركز', pageType: 'edit' },
      },
      {
        path: 'center-detail',
        canActivate: [redirectOnDirectCenterAccessGuard],
        loadChildren: () =>
          import('./components/center-details/center-details.routes').then(
            (c) => c.centerDetailsRoutes
          ),
        data: { pageTitle: 'تفاصيل المركز', pageType: 'list' },
      },
      {
        path: 'center-member',
        canActivate: [redirectOnDirectCenterAccessGuard],
        loadChildren: () =>
          import('./components/center-members/center-members.routes').then(
            (c) => c.centerMembersRoutes
          ),
        data: { pageTitle: 'اعضاء المركز', pageType: 'list' },
      },
    ],
  },
];
