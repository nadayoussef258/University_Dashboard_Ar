import { Routes } from '@angular/router';

export const mainCentersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/center-tabs/center-tabs.component').then(
        (c) => c.CenterTabsComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main-centers', // ✅ أول ما يدخل على /managements يروح هنا
      },
      {
        path: 'main-centers',
        loadChildren: () =>
          import('./components/center/centers.routes').then(
            (m) => m.centersRoutes
          ),
      },
      {
        path: 'center-attachments',
        loadChildren: () =>
          import(
            './components/center-attachments/center-attachments.routes'
          ).then((m) => m.centerAttachmentsRoutes),
      },
      {
        path: 'center-details',
        loadChildren: () =>
          import('./components/center-details/center-details.routes').then(
            (m) => m.centerDetailsRoutes
          ),
      },
      {
        path: 'center-members',
        loadChildren: () =>
          import('./components/center-members/center-members.routes').then(
            (m) => m.centerMembersRoutes
          ),
      },
    ],
  },
];
