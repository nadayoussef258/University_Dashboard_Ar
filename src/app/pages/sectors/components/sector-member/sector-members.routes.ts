import { Routes } from '@angular/router';

export const sectorMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sector-members.component').then(
        (c) => c.SectorMembersComponent
      ),
    data: { pageTitle: 'اعضاء القطاعات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../add-edit-sector-member/add-edit-sector-member.component').then(
        (c) => c.AddEditSectorMemberComponent
      ),
    data: { pageTitle: 'اضافة عضو للقطاع', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../add-edit-sector-member/add-edit-sector-member.component').then(
        (c) => c.AddEditSectorMemberComponent
      ),
    data: { pageTitle: 'تعديل عضو في القطاع', pageType: 'edit' },
  },
];
