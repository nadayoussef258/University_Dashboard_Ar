import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { clearManagementIdGuard } from './guards/managements/clear-management-id-guard.guard';

export const pagesRoutes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.settingsRoutes),
  },
  {
    path: 'managements',
    loadChildren: () =>
      import('./managements/managements.routes').then(
        (m) => m.managementsRoutes
      ),
  },
  {
    path: 'management-details',
    loadChildren: () =>
      import(
        './managements/components/management-detail/management-details.routes'
      ).then((m) => m.managementDetailsRoutes),
  },
  {
    path: 'management-members',
    loadChildren: () =>
      import(
        './managements/components/management-member/management-members.routes'
      ).then((m) => m.managementMembersRoutes),
  },
  {
    path: 'units',
    loadChildren: () =>
      import('./units/units.routes').then((m) => m.unitsRoutes),
  },
  {
    path: 'unit-details',
    loadChildren: () =>
      import('./units/components/unit-detail/unit-details.routes').then(
        (m) => m.unitDetailsRoutes
      ),
  },
  {
    path: 'unit-members',
    loadChildren: () =>
      import('./units/components/unit-member/unit-members.routes').then(
        (m) => m.unitMembersRoutes
      ),
  },
  {
    path: 'centers',
    loadChildren: () =>
      import('../pages/centers/centers.routes').then(
        (m) => m.mainCentersRoutes
      ),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.routes').then(
        (m) => m.departmentsRoutes
      ),
  },
  {
    path: 'page-s',
    loadChildren: () =>
      import('./page-s/page-s.routes').then((m) => m.pagesRoutes),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.routes').then((m) => m.aboutRoutes),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.routes').then((m) => m.postsRoutes),
  },
  {
    path: 'sectors',
    loadChildren: () =>
      import('./sectors/sectors.routes').then((m) => m.sectorsRoutes),
  },
  {
    path: 'sector-details',
    loadChildren: () =>
      import('./sectors/components/sector-details/sector-details.routes').then(
        (m) => m.sectorDetailsRoutes
      ),
  },
  {
    path: 'sector-members',
    loadChildren: () =>
      import('./sectors/components/sector-member/sector-members.routes').then(
        (m) => m.sectorMembersRoutes
      ),
  },
  {
    path: 'sector-posts',
    loadChildren: () =>
      import('./sectors/components/sector-posts/sector-posts.routes').then(
        (m) => m.sectorPostsRoutes
      ),
  },
  {
    path: 'sector-programs',
    loadChildren: () =>
      import(
        './sectors/components/sector-programs/sector-programs.routes'
      ).then((m) => m.sectorProgramsRoutes),
  },
  { path: 'empty', component: Empty },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' },
] as Routes;
