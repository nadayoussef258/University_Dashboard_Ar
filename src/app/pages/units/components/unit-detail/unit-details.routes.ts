import { Routes } from '@angular/router';
import { clearUnitIdGuard } from '../../../guards/units/clear-unit-id-guard.guard';

export const unitDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./unit-details.component').then((c) => c.UnitDetailsComponent),
    data: {
      pageTitle: 'PAGES.UNIT_DETAILS.MAIN.PAGE_TITLE',
      pageType: 'list'
    },
    canActivate: [clearUnitIdGuard]
  },
  {
    path: 'add',
    loadComponent: () => import('../add-edit-unit-detail/add-edit-unit-detail.component').then((c) => c.AddEditUnitDetailComponent),
    data: { pageTitle: 'PAGES.UNIT_DETAILS.ADD.PAGE_TITLE', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../add-edit-unit-detail/add-edit-unit-detail.component').then((c) => c.AddEditUnitDetailComponent),
    data: {
      pageTitle: 'PAGES.UNIT_DETAILS.EDIT.PAGE_TITLE',
      pageType: 'edit'
    }
  }
];
