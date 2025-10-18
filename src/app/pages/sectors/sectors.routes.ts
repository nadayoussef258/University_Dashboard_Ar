import { Routes } from '@angular/router';
import { redirectIfDirectAccessSectorGuard } from '../guards/sectors/redirect-if-direct-access-sectors.guard';

export const sectorsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sectors/sectors.component').then(
        (c) => c.SectorsComponent
      ),
    data: { pageTitle: 'ادارة الصفحات والتعريف', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-sector/add-edit-sector.component').then(
        (c) => c.AddEditSectorComponent
      ),
    data: { pageTitle: 'اضافة ادارة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/sectors-tabs/sectors-tabs.component').then(
        (c) => c.SectorsTabsComponent
      ),
    data: { pageTitle: 'تعديل ادارة', pageType: 'edit' },
    canActivateChild: [redirectIfDirectAccessSectorGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/add-edit-sector/add-edit-sector.component').then(
            (c) => c.AddEditSectorComponent
          ),
      },
      {
        path: 'sector-detail',
        loadChildren: () =>
          import('./components/sector-details/sector-details.routes').then(
            (c) => c.sectorDetailsRoutes
          ),
      },
      {
        path: 'sector-member',
        loadChildren: () =>
          import('./components/sector-member/sector-members.routes').then(
            (c) => c.sectorMembersRoutes
          ),
      },
      {
        path: 'sector-post',
        loadChildren: () =>
          import('./components/sector-posts/sector-posts.routes').then(
            (c) => c.sectorPostsRoutes
          ),
      },
      {
        path: 'sector-program',
        loadChildren: () =>
          import('./components/sector-programs/sector-programs.routes').then(
            (c) => c.sectorProgramsRoutes
          ),
      },
      {
        path: 'sector-service',
        loadChildren: () =>
          import('./components/sector-services/sector-services.routes').then(
            (c) => c.sectorServicesRoutes
          ),
      },
      {
        path: 'sector-unit',
        loadChildren: () =>
          import('./components/sector-units/sector-units.routes').then(
            (c) => c.sectorUnitsRoutes
          ),
      },
    ],
  },
];
