import { Routes } from '@angular/router';
import { redirectIfDirectAccessUnitGuard } from '../guards/units/redirect-if-direct-access-unit.guard';

export const unitsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/units/units.component').then((c) => c.UnitsComponent),
    data: { pageTitle: 'الوحدات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-main-unit/add-edit-main-unit.component'
      ).then((c) => c.AddEditUnitComponent),
    data: { pageTitle: 'اضافة وحدة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-main-info-unit/add-edit-main-info-unit.component'
      ).then((c) => c.AddEditMainInfoUnitComponent),
    data: { pageTitle: 'تعديل الوحدة', pageType: 'edit' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/add-edit-main-unit/add-edit-main-unit.component'
          ).then((c) => c.AddEditUnitComponent),
      },
      {
        path: 'unit-detail',
        canActivate: [redirectIfDirectAccessUnitGuard],
        loadChildren: () =>
          import('./components/unit-detail/unit-details.routes').then(
            (c) => c.unitDetailsRoutes
          ),
      },
      {
        path: 'unit-member',
        canActivate: [redirectIfDirectAccessUnitGuard],
        loadChildren: () =>
          import('./components/unit-member/unit-members.routes').then(
            (c) => c.unitMembersRoutes
          ),
      },
    ],
  },
];
