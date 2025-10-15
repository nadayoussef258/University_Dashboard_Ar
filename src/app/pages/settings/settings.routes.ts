import { Routes } from '@angular/router';
import { Empty } from './../empty/empty';

export const settingsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contacts',
        loadChildren: () =>
          import('./contacts/contacts.routes').then((m) => m.contactsRoutes),
      },
      {
        path: 'actions',
        loadChildren: () =>
          import('./actions/actions.routes').then((m) => m.actionsRoutes),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.routes').then(
            (m) => m.categoriesRoutes
          ),
      },
      {
        path: 'hero-sections',
        loadChildren: () =>
          import('./hero-sections/hero-sections.routes').then(
            (m) => m.heroSectionsRoutes
          ),
      },
      {
        path: 'logos',
        loadChildren: () =>
          import('./logos/logos.routes').then((m) => m.logosRoutes),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./services/services.routes').then((m) => m.servicesRoutes),
      },
      {
        path: 'statistics',
        loadChildren: () =>
          import('./statistics/statistics.routes').then(
            (m) => m.statisticsRoutes
          ),
      },
      {
        path: 'menu-types',
        loadChildren: () =>
          import('./menu-types/menu-types.routes').then(
            (m) => m.menuTypesRoutes
          ),
      },
      {
        path: 'menu-items',
        loadChildren: () =>
          import('./menu-items/menu-items.routes').then(
            (m) => m.menuItemsRoutes
          ),
      },
    ],
  },

  {
    path: 'empty',
    redirectTo: '/empty',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/notfound',
    pathMatch: 'full',
  },
] as Routes;
