import { Routes } from '@angular/router';
import {
  redirectOnDirectUnitsAccessGuard,
  validateUnitIdGuard,
} from '../guards/units';
export const unitsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/units/units.component').then((c) => c.UnitsComponent),
    data: { pageTitle: 'PAGES.UNITS.MAIN.PAGE_TITLE', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-main-info-unit/add-edit-main-info-unit.component'
      ).then((c) => c.AddEditMainInfoUnitComponent),
    data: { pageTitle: 'PAGES.UNITS.ADD.PAGE_TITLE', pageType: 'add' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/add-edit-main-unit/add-edit-main-unit.component'
          ).then((c) => c.AddEditUnitComponent),
        data: { pageTitle: 'PAGES.UNITS.EDIT.PAGE_TITLE', pageType: 'add' },
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-main-info-unit/add-edit-main-info-unit.component'
      ).then((c) => c.AddEditMainInfoUnitComponent),
    data: { pageTitle: 'PAGES.UNITS.EDIT.PAGE_TITLE', pageType: 'edit' },
    children: [
      {
        path: '',
        canActivate: [validateUnitIdGuard],
        loadComponent: () =>
          import(
            './components/add-edit-main-unit/add-edit-main-unit.component'
          ).then((c) => c.AddEditUnitComponent),
      },
      {
        path: 'unit-detail',
        canActivate: [redirectOnDirectUnitsAccessGuard],
        loadChildren: () =>
          import('./components/unit-detail/unit-details.routes').then(
            (c) => c.unitDetailsRoutes,
          ),
      },
      {
        path: 'unit-member',
        canActivate: [redirectOnDirectUnitsAccessGuard],
        loadChildren: () =>
          import('./components/unit-member/unit-members.routes').then(
            (c) => c.unitMembersRoutes,
          ),
      },
    ],
  },
];
