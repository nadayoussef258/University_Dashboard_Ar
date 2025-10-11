import { Routes } from '@angular/router';
import { Empty } from './empty/empty';

export const pagesRoutes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.settingsRoutes),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.routes').then(
        (m) => m.departmentsRoutes
      ),
  },
  { path: 'empty', redirectTo: '/empty', pathMatch: 'full' },
  { path: '**', redirectTo: '/notfound', pathMatch: 'full' },
] as Routes;
