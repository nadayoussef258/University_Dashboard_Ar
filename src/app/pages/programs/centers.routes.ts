import { Routes } from '@angular/router';
import {
  redirectOnDirectProgramAccessGuard,
  validateProgramIdGuard,
} from '../guards/programs';

export const programsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/programs/programs.component').then(
        (c) => c.ProgramsComponent
      ),
    data: { pageTitle: 'البرامج', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/programs-tabs/programs-tabs.component').then(
        (c) => c.ProgramsTabsComponent
      ),
    data: { pageTitle: 'إضافة برنامج', pageType: 'add' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/add-edit-program/add-edit-program.component'
          ).then((c) => c.AddEditProgramComponent),
        data: { pageTitle: 'إضافة برنامج', pageType: 'add' },
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/programs-tabs/programs-tabs.component').then(
        (c) => c.ProgramsTabsComponent
      ),
    data: { pageTitle: 'تعديل برنامج', pageType: 'edit' },
    children: [
      {
        path: '',
        canActivate: [validateProgramIdGuard],
        loadComponent: () =>
          import(
            './components/add-edit-program/add-edit-program.component'
          ).then((c) => c.AddEditProgramComponent),
        data: { pageTitle: 'تعديل برنامج', pageType: 'edit' },
      },
      {
        path: 'program-detail',
        canActivate: [redirectOnDirectProgramAccessGuard],
        loadChildren: () =>
          import('./components/program-details/program-details.routes').then(
            (c) => c.programDetailsRoutes
          ),
        data: { pageTitle: 'تفاصيل برنامج', pageType: 'list' },
      },
      {
        path: 'program-member',
        canActivate: [redirectOnDirectProgramAccessGuard],
        loadChildren: () =>
          import('./components/program-members/program-members.routes').then(
            (c) => c.programMembersRoutes
          ),
        data: { pageTitle: 'اعضاء برنامج', pageType: 'list' },
      },
    ],
  },
];
