import { Routes } from '@angular/router';
import { clearProgramIdGuard } from '../../../guards/programs';

export const programDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./program-details.component').then(
        (c) => c.ProgramDetailsComponent,
      ),
    data: {
      pageTitle: 'PAGES.PROGRAM_DETAILS.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
    canActivate: [clearProgramIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        '../add-edit-program-detail/add-edit-program-detail.component'
      ).then((c) => c.AddEditProgramDetailComponent),
    data: {
      pageTitle: 'PAGES.PROGRAM_DETAILS.ADD.PAGE_TITLE',
      pageType: 'add',
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../add-edit-program-detail/add-edit-program-detail.component'
      ).then((c) => c.AddEditProgramDetailComponent),
    data: {
      pageTitle: 'PAGES.PROGRAM_DETAILS.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
