import { Routes } from '@angular/router';
import { clearSectorIdGuard } from '../../../guards/sectors/clear-sector-id-sector.guard';

export const sectorServicesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sector-services.component').then(
        (c) => c.SectorServicesComponent,
      ),
    data: {
      pageTitle: 'PAGES.SECTOR_SERVICES.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
    canActivate: [clearSectorIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        '../add-edit-sector-service/add-edit-sector-service.component'
      ).then((c) => c.AddEditSectorServiceComponent),
    data: {
      pageTitle: 'PAGES.SECTOR_SERVICES.ADD.PAGE_TITLE',
      pageType: 'add',
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../add-edit-sector-service/add-edit-sector-service.component'
      ).then((c) => c.AddEditSectorServiceComponent),
    data: {
      pageTitle: 'PAGES.SECTOR_SERVICES.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
