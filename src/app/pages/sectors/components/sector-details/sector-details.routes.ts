import { Routes } from '@angular/router';
import { clearSectorIdGuard } from '../../../guards/sectors/clear-sector-id-sector.guard';

export const sectorDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./sector-details.component').then((c) => c.SectorDetailsComponent),
    data: {
      pageTitle: 'PAGES.SECTOR_DETAILS.MAIN.PAGE_TITLE',
      pageType: 'list'
    },
    canActivate: [clearSectorIdGuard]
  },
  {
    path: 'add',
    loadComponent: () => import('../add-edit-sector-detail/add-edit-sector-detail.component').then((c) => c.AddEditSectorDetailComponent),
    data: { pageTitle: 'PAGES.SECTOR_DETAILS.ADD.PAGE_TITLE', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../add-edit-sector-detail/add-edit-sector-detail.component').then((c) => c.AddEditSectorDetailComponent),
    data: {
      pageTitle: 'PAGES.SECTOR_DETAILS.EDIT.PAGE_TITLE',
      pageType: 'edit'
    }
  }
];
