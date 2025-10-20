import { Routes } from '@angular/router';
import { Empty } from './empty/empty';

export const pagesRoutes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.settingsRoutes),
  },
  {
    path: 'members',
    loadChildren: () =>
      import('./members/members.routes').then((m) => m.membersRoutes),
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
  {
    path: 'sector-services',
    loadChildren: () =>
      import(
        './sectors/components/sector-services/sector-services.routes'
      ).then((m) => m.sectorServicesRoutes),
  },
  {
    path: 'sector-units',
    loadChildren: () =>
      import('./sectors/components/sector-units/sector-units.routes').then(
        (c) => c.sectorUnitsRoutes
      ),
  },
  {
    path: 'centers',
    loadChildren: () =>
      import('./centers/centers.routes').then((m) => m.centersRoutes),
  },
  {
    path: 'center-details',
    loadChildren: () =>
      import('./centers/components/center-details/center-details.routes').then(
        (m) => m.centerDetailsRoutes
      ),
  },
  {
    path: 'center-members',
    loadChildren: () =>
      import('./centers/components/center-members/center-members.routes').then(
        (m) => m.centerMembersRoutes
      ),
  },
  {
    path: 'programs',
    loadChildren: () =>
      import('./programs/centers.routes').then((m) => m.programsRoutes),
  },
  {
    path: 'program-details',
    loadChildren: () =>
      import(
        './programs/components/program-details/program-details.routes'
      ).then((m) => m.programDetailsRoutes),
  },
  {
    path: 'program-members',
    loadChildren: () =>
      import(
        './programs/components/program-members/program-members.routes'
      ).then((m) => m.programMembersRoutes),
  },
  { path: 'empty', component: Empty },
  { path: '**', redirectTo: '/notfound-404', pathMatch: 'full' },
] as Routes;
