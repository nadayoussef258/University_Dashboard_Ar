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
        canActivate: [redirectIfDirectAccessSectorGuard],
      },
      {
        path: 'sector-member',
        loadChildren: () =>
          import('./components/sector-member/sector-members.routes').then(
            (c) => c.sectorMembersRoutes
          ),
        canActivate: [redirectIfDirectAccessSectorGuard],
      },
      {
        path: 'sector-post',
        loadChildren: () =>
          import('./components/sector-posts/sector-posts.routes').then(
            (c) => c.sectorPostsRoutes
          ),
        canActivate: [redirectIfDirectAccessSectorGuard],
      },
      {
        path: 'sector-program',
        loadChildren: () =>
          import('./components/sector-programs/sector-programs.routes').then(
            (c) => c.sectorProgramsRoutes
          ),
        canActivate: [redirectIfDirectAccessSectorGuard],
      },
    ],
  },
];
