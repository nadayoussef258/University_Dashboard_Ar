import { Routes } from '@angular/router';
import { clearSectorIdGuard } from '../../../guards/sectors/clear-sector-id-sector.guard';

export const sectorServicesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sector-services.component').then(
        (c) => c.SectorServicesComponent
      ),
    data: { pageTitle: 'خدمات القطاعات', pageType: 'list' },
    canActivate: [clearSectorIdGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        '../add-edit-sector-service/add-edit-sector-service.component'
      ).then((c) => c.AddEditSectorServiceComponent),
    data: { pageTitle: 'اضافة خدمات للقطاع', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../add-edit-sector-service/add-edit-sector-service.component'
      ).then((c) => c.AddEditSectorServiceComponent),
    data: { pageTitle: 'تعديل خدمات القطاع', pageType: 'edit' },
  },
];
