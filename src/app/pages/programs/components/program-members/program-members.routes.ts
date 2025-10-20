import { Routes } from '@angular/router';
import { clearProgramIdGuard } from '../../../guards/programs';

export const programMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./program-members.component').then(
        (c) => c.ProgramMembersComponent
      ),
    data: { pageTitle: 'أعضاء البرامج', pageType: 'list' },
    canActivate: [clearProgramIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        '../add-edit-program-member/add-edit-program-member.component'
      ).then((c) => c.AddEditProgramMemberComponent),
    data: { pageTitle: 'اضافة عضو للبرنامج', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../add-edit-program-member/add-edit-program-member.component'
      ).then((c) => c.AddEditProgramMemberComponent),
    data: { pageTitle: 'تعديل عضو', pageType: 'edit' },
  },
];
