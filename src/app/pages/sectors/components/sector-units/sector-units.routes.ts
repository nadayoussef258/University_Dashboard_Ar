import { Routes } from '@angular/router';
import { clearSectorIdGuard } from '../../../guards/sectors/clear-sector-id-sector.guard';

export const sectorUnitsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./sector-units.component').then((c) => c.SectorUnitsComponent),
    data: { pageTitle: 'PAGES.SECTOR_UNITS.MAIN.PAGE_TITLE', pageType: 'list' },
    canActivate: [clearSectorIdGuard]
  },
  {
    path: 'add',
    loadComponent: () => import('./../add-edit-sector-unit/add-edit-sector-unit.component').then((c) => c.AddEditSectorUnitComponent),
    data: { pageTitle: 'PAGES.SECTOR_UNITS.ADD.PAGE_TITLE', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./../add-edit-sector-unit/add-edit-sector-unit.component').then((c) => c.AddEditSectorUnitComponent),
    data: { pageTitle: 'PAGES.SECTOR_UNITS.EDIT.PAGE_TITLE', pageType: 'edit' }
  }
];
