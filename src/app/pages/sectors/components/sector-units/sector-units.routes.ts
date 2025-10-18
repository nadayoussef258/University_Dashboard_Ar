import { Routes } from '@angular/router';
import { clearSectorIdGuard } from '../../../guards/sectors/clear-sector-id-sector.guard';

export const sectorUnitsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sector-units.component').then((c) => c.SectorUnitsComponent),
    data: { pageTitle: 'وحدات القطاعات', pageType: 'list' },
    canActivate: [clearSectorIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./../add-edit-sector-unit/add-edit-sector-unit.component').then(
        (c) => c.AddEditSectorUnitComponent
      ),
    data: { pageTitle: 'اضافة تفاصيل للقطاع', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./../add-edit-sector-unit/add-edit-sector-unit.component').then(
        (c) => c.AddEditSectorUnitComponent
      ),
    data: { pageTitle: 'تعديل تفاصيل القطاع', pageType: 'edit' },
  },
];
