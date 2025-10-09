import { Routes } from '@angular/router';
import { Empty } from './empty/empty';

export default [
  {
    path: 'settings',
    children: [
      {
        path: 'actions',
        loadChildren: () =>
          import('./settings/actions/actions.routes').then(
            (m) => m.actionsRoutes
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./settings/categories/categories.routes').then(
            (m) => m.categoriesRoutes
          ),
      },
    ],
  },
  // {
  //     path: 'items',
  //     loadChildren: () => import('./items/items.routes').then((m) => m.itemsRoutes)
  // },

  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.routes').then(
        (m) => m.departmentsRoutes
      ),
  },
  { path: 'empty', component: Empty },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
