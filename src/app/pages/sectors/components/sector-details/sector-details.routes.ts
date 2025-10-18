import { Routes } from '@angular/router';
import { clearSectorIdGuard } from '../../../guards/sectors/clear-unit-id-sector.guard';

export const sectorDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sector-details.component').then(
        (c) => c.SectorDetailsComponent
      ),
    data: { pageTitle: 'تفاصيل القطاعات', pageType: 'list' },
    canActivate: [clearSectorIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../add-edit-sector-detail/add-edit-sector-detail.component').then(
        (c) => c.AddEditSectorDetailComponent
      ),
    data: { pageTitle: 'اضافة تفاصيل للقطاع', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../add-edit-sector-detail/add-edit-sector-detail.component').then(
        (c) => c.AddEditSectorDetailComponent
      ),
    data: { pageTitle: 'تعديل تفاصيل القطاع', pageType: 'edit' },
  },
];
