import { Routes } from '@angular/router';
import { Empty } from './empty/empty';

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
  { path: 'empty', component: Empty },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' },
] as Routes;
