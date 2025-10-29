import { Routes } from '@angular/router';
import { clearSectorIdGuard } from '../../../guards/sectors/clear-sector-id-sector.guard';

export const sectorMembersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sector-members.component').then(
        (c) => c.SectorMembersComponent,
      ),
    data: {
      pageTitle: 'PAGES.SECTOR_MEMBERS.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
    canActivate: [clearSectorIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../add-edit-sector-member/add-edit-sector-member.component').then(
        (c) => c.AddEditSectorMemberComponent,
      ),
    data: { pageTitle: 'PAGES.SECTOR_MEMBERS.ADD.PAGE_TITLE', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../add-edit-sector-member/add-edit-sector-member.component').then(
        (c) => c.AddEditSectorMemberComponent,
      ),
    data: {
      pageTitle: 'PAGES.SECTOR_MEMBERS.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
