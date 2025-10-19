import { Routes } from '@angular/router';
import {
  validateSectorIdGuard,
  redirectOnDirectSectorAccessGuard,
} from '../guards/sectors';

export const sectorsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sectors/sectors.component').then(
        (c) => c.SectorsComponent
      ),
    data: { pageTitle: 'القطاعات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/sectors-tabs/sectors-tabs.component').then(
        (c) => c.SectorsTabsComponent
      ),
    data: { pageTitle: 'اضافة قطاع', pageType: 'add' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/add-edit-sector/add-edit-sector.component').then(
            (c) => c.AddEditSectorComponent
          ),
        data: { pageTitle: 'اضافة قطاع', pageType: 'add' },
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/sectors-tabs/sectors-tabs.component').then(
        (c) => c.SectorsTabsComponent
      ),
    data: { pageTitle: 'تعديل ادارة', pageType: 'edit' },
    children: [
      {
        path: '',
        canActivateChild: [validateSectorIdGuard],
        loadComponent: () =>
          import('./components/add-edit-sector/add-edit-sector.component').then(
            (c) => c.AddEditSectorComponent
          ),
      },
      {
        path: 'sector-detail',
        canActivate: [redirectOnDirectSectorAccessGuard],
        loadChildren: () =>
          import('./components/sector-details/sector-details.routes').then(
            (c) => c.sectorDetailsRoutes
          ),
      },
      {
        path: 'sector-member',
        canActivate: [redirectOnDirectSectorAccessGuard],
        loadChildren: () =>
          import('./components/sector-member/sector-members.routes').then(
            (c) => c.sectorMembersRoutes
          ),
      },
      {
        path: 'sector-post',
        canActivate: [redirectOnDirectSectorAccessGuard],
        loadChildren: () =>
          import('./components/sector-posts/sector-posts.routes').then(
            (c) => c.sectorPostsRoutes
          ),
      },
      {
        path: 'sector-program',
        canActivate: [redirectOnDirectSectorAccessGuard],
        loadChildren: () =>
          import('./components/sector-programs/sector-programs.routes').then(
            (c) => c.sectorProgramsRoutes
          ),
      },
      {
        path: 'sector-service',
        canActivate: [redirectOnDirectSectorAccessGuard],
        loadChildren: () =>
          import('./components/sector-services/sector-services.routes').then(
            (c) => c.sectorServicesRoutes
          ),
      },
      {
        path: 'sector-unit',
        canActivate: [redirectOnDirectSectorAccessGuard],
        loadChildren: () =>
          import('./components/sector-units/sector-units.routes').then(
            (c) => c.sectorUnitsRoutes
          ),
      },
    ],
  },
];
