import { Routes } from '@angular/router';
import { clearSectorIdGuard } from '../../../guards/sectors/clear-sector-id-sector.guard';

export const sectorProgramsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sector-programs.component').then(
        (c) => c.SectorProgramsComponent,
      ),
    data: {
      pageTitle: 'PAGES.SECTOR_PROGRAMS.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
    canActivate: [clearSectorIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        '../add-edit-sector-program/add-edit-sector-program.component'
      ).then((c) => c.AddEditSectorProgramComponent),
    data: {
      pageTitle: 'PAGES.SECTOR_PROGRAMS.ADD.PAGE_TITLE',
      pageType: 'add',
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../add-edit-sector-program/add-edit-sector-program.component'
      ).then((c) => c.AddEditSectorProgramComponent),
    data: {
      pageTitle: 'PAGES.SECTOR_PROGRAMS.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
