import { Routes } from '@angular/router';

export const mainManagementsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/actions/actions.component').then(
        (c) => c.ActionsComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main-managements', // ✅ أول ما يدخل على /managements يروح هنا
      },
      {
        path: 'main-managements',
        loadChildren: () =>
          import('./components/management/managements.routes').then(
            (m) => m.managementsRoutes
          ),
      },
      {
        path: 'management-attachments',
        loadChildren: () =>
          import(
            './components/management-attachment/management-attachments.routes'
          ).then((m) => m.actionsRoutes),
      },
    ],
  },
];
