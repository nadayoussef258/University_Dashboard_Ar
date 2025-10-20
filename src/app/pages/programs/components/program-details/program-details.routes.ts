import { Routes } from '@angular/router';
import { clearProgramIdGuard } from '../../../guards/programs';

export const programDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./program-details.component').then(
        (c) => c.ProgramDetailsComponent
      ),
    data: { pageTitle: 'تفاصيل البرامج', pageType: 'list' },
    canActivate: [clearProgramIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        '../add-edit-program-detail/add-edit-program-detail.component'
      ).then((c) => c.AddEditProgramDetailComponent),
    data: { pageTitle: 'اضافة تفاصيل للبرنامج', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../add-edit-program-detail/add-edit-program-detail.component'
      ).then((c) => c.AddEditProgramDetailComponent),
    data: { pageTitle: 'تعديل تفاصيل البرنامج', pageType: 'edit' },
  },
];
