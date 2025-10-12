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
      import('../pages/managements/managements.routes').then(
        (m) => m.mainManagementsRoutes
      ),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.routes').then(
        (m) => m.departmentsRoutes
      ),
  },
  { path: 'empty', component: Empty },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' },
] as Routes;
