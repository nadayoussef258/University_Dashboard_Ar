import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Landing } from './pages/landing/landing';
import { Notfound } from './pages/notfound/notfound';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', component: Dashboard },
      {
        path: 'pages',
        loadChildren: () => import('../app/pages/pages.routes').then((m) => m.pagesRoutes)
      }
    ]
  },
  { path: 'landing', component: Landing },
  { path: 'auth', loadChildren: () => import('../app/pages/auth/auth.routes') },
  {
    path: 'notfound-404',
    component: Notfound
  },

  {
    path: '**',
    redirectTo: '/notfound-404',
    pathMatch: 'full'
  }
];
