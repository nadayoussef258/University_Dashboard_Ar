import { Routes } from '@angular/router';
import { clearUnitIdGuard } from '../../../guards/units/clear-unit-id-guard.guard';

export const unitDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./unit-details.component').then((c) => c.UnitDetailsComponent),
    data: { pageTitle: 'تفاصيل الوحدات', pageType: 'list' },
    canActivate: [clearUnitIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../add-edit-unit-detail/add-edit-unit-detail.component').then(
        (c) => c.AddEditUnitDetailComponent
      ),
    data: { pageTitle: 'اضافة تفاصيل الوحدة', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../add-edit-unit-detail/add-edit-unit-detail.component').then(
        (c) => c.AddEditUnitDetailComponent
      ),
    data: { pageTitle: 'تعديل تفاصيل الوحدة', pageType: 'edit' },
  },
];
