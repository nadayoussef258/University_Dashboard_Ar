import { Routes } from '@angular/router';

export const mainManagementsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-mangments/main-mangments.component').then(
        (c) => c.MainMangmentsComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main-managements', // ✅ أول ما يدخل على /managements يروح هنا
      },
      {
        path: 'managements',
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
          ).then((m) => m.managementAttachmentsRoutes),
      },
      {
        path: 'management-details',
        loadChildren: () =>
          import(
            './components/management-detail/management-details.routes'
          ).then((m) => m.managementDetailsRoutes),
      },
      {
        path: 'management-members',
        loadChildren: () =>
          import(
            './components/management-member/management-members.routes'
          ).then((m) => m.managementMembersRoutes),
      },
    ],
  },
];
