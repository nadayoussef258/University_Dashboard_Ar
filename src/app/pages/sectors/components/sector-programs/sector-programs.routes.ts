import { Routes } from '@angular/router';

export const sectorProgramsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sector-programs.component').then(
        (c) => c.SectorProgramsComponent
      ),
    data: { pageTitle: 'اعضاء القطاعات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        '../add-edit-sector-program/add-edit-sector-program.component'
      ).then((c) => c.AddEditSectorProgramComponent),
    data: { pageTitle: 'اضافة برنامج', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../add-edit-sector-program/add-edit-sector-program.component'
      ).then((c) => c.AddEditSectorProgramComponent),
    data: { pageTitle: 'تعديل برنامج', pageType: 'edit' },
  },
];
