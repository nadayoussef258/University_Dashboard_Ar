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
        (c) => c.ProgramsComponent,
      ),
    data: { pageTitle: 'PAGES.PROGRAMS.MAIN.PAGE_TITLE', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/programs-tabs/programs-tabs.component').then(
        (c) => c.ProgramsTabsComponent,
      ),
    data: { pageTitle: 'PAGES.PROGRAMS.ADD.PAGE_TITLE', pageType: 'add' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/add-edit-program/add-edit-program.component'
          ).then((c) => c.AddEditProgramComponent),
        data: { pageTitle: 'PAGES.PROGRAMS.ADD.PAGE_TITLE', pageType: 'add' },
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/programs-tabs/programs-tabs.component').then(
        (c) => c.ProgramsTabsComponent,
      ),
    data: { pageTitle: 'PAGES.PROGRAMS.EDIT.PAGE_TITLE', pageType: 'edit' },
    children: [
      {
        path: '',
        canActivate: [validateProgramIdGuard],
        loadComponent: () =>
          import(
            './components/add-edit-program/add-edit-program.component'
          ).then((c) => c.AddEditProgramComponent),
        data: { pageTitle: 'PAGES.PROGRAMS.EDIT.PAGE_TITLE', pageType: 'edit' },
      },
      {
        path: 'program-detail',
        canActivate: [redirectOnDirectProgramAccessGuard],
        loadChildren: () =>
          import('./components/program-details/program-details.routes').then(
            (c) => c.programDetailsRoutes,
          ),
        data: {
          pageTitle: 'PAGES.PROGRAM_DETAIL.MAIN.PAGE_TITLE',
          pageType: 'list',
        },
      },
      {
        path: 'program-member',
        canActivate: [redirectOnDirectProgramAccessGuard],
        loadChildren: () =>
          import('./components/program-members/program-members.routes').then(
            (c) => c.programMembersRoutes,
          ),
        data: {
          pageTitle: 'PAGES.PROGRAM_MEMBER.MAIN.PAGE_TITLE',
          pageType: 'list',
        },
      },
    ],
  },
];
