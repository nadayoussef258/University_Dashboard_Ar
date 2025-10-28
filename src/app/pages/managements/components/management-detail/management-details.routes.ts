import { Routes } from '@angular/router';
import { clearManagementIdGuard } from '../../../guards/managements/clear-management-id-guard.guard';
export const managementDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./management-details.component').then(
        (c) => c.ManagementDetailsComponent,
      ),
    data: {
      pageTitle: 'PAGES.MANAGEMENT_DETAILS.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
    canActivate: [clearManagementIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        '../add-edit-management-detail/add-edit-management-detail.component'
      ).then((c) => c.AddEditManagementDetailComponent),
    data: {
      pageTitle: 'PAGES.MANAGEMENT_DETAILS.ADD.PAGE_TITLE',
      pageType: 'add',
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../add-edit-management-detail/add-edit-management-detail.component'
      ).then((c) => c.AddEditManagementDetailComponent),
    data: {
      pageTitle: 'PAGES.MANAGEMENT_DETAILS.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
