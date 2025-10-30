import { Routes } from '@angular/router';
import { clearProgramIdGuard } from '../../../guards/programs';

export const programMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./program-members.component').then((c) => c.ProgramMembersComponent),
    data: {
      pageTitle: 'PAGES.PROGRAM_MEMBERS.MAIN.PAGE_TITLE',
      pageType: 'list'
    },
    canActivate: [clearProgramIdGuard]
  },
  {
    path: 'add',
    loadComponent: () => import('../add-edit-program-member/add-edit-program-member.component').then((c) => c.AddEditProgramMemberComponent),
    data: {
      pageTitle: 'PAGES.PROGRAM_MEMBERS.ADD.PAGE_TITLE',
      pageType: 'add'
    }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../add-edit-program-member/add-edit-program-member.component').then((c) => c.AddEditProgramMemberComponent),
    data: {
      pageTitle: 'PAGES.PROGRAM_MEMBERS.ADD.PAGE_TITLE',
      pageType: 'edit'
    }
  }
];
