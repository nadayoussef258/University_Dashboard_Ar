import { Routes } from '@angular/router';
import { clearUnitIdGuard } from '../../../guards/units/clear-unit-id-guard.guard';

export const unitMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./unit-members.component').then((c) => c.UnitMembersComponent),
    data: { pageTitle: 'PAGES.UNIT_MEMBERS.MAIN.PAGE_TITLE', pageType: 'list' },
    canActivate: [clearUnitIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../add-edit-unit-member/add-edit-unit-member.component').then(
        (c) => c.AddEditUnitMemberComponent,
      ),
    data: { pageTitle: 'PAGES.UNIT_MEMBERS.ADD.PAGE_TITLE', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../add-edit-unit-member/add-edit-unit-member.component').then(
        (c) => c.AddEditUnitMemberComponent,
      ),
    data: { pageTitle: 'PAGES.UNIT_MEMBERS.EDIT.PAGE_TITLE', pageType: 'edit' },
  },
];
