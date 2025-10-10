import { Routes } from '@angular/router';
import { Empty } from './empty/empty';

export default [
  {
    path: 'settings',
    children: [
      {
        path: 'contacts',
        loadChildren: () =>
          import('./settings/contacts/contacts.routes').then(
            (m) => m.contactsRoutes
          ),
      },
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
      {
        path: 'hero-sections',
        loadChildren: () =>
          import('./settings/hero-sections/hero-sections.routes').then(
            (m) => m.heroSectionsRoutes
          ),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./settings/services/services.routes').then(
            (m) => m.servicesRoutes
          ),
      },
      {
        path: 'statistics',
        loadChildren: () =>
          import('./settings/statistics/statistics.routes').then(
            (m) => m.statisticsRoutes
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
