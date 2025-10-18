import { Routes } from '@angular/router';
import { redirectIfDirectAccessCenterGuard } from '../guards/centers/redirect-if-direct-access-center.guard';
import { CenterResolver } from './center-resolver.resolver';

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
        loadComponent: () =>
          import('./components/add-edit-center/add-edit-center.component').then(
            (c) => c.AddEditCenterComponent
          ),
      },
      {
        path: 'center-detail',
        loadChildren: () =>
          import('./components/center-details/center-details.routes').then(
            (c) => c.centerDetailsRoutes
          ),
        canActivate: [redirectIfDirectAccessCenterGuard],
      },
      {
        path: 'center-member',
        loadChildren: () =>
          import('./components/center-members/center-members.routes').then(
            (c) => c.centerMembersRoutes
          ),
        canActivate: [redirectIfDirectAccessCenterGuard],
      },
    ],
  },
];
