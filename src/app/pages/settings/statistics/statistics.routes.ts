import { Routes } from '@angular/router';

export const statisticsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/statistics/statistics.component').then(
        (c) => c.StatisticsComponent,
      ),
    data: {
      pageTitle: 'SETTINGS.STATISTICS.MAIN.PAGE_TITLE',
      pageType: 'list',
    },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-statistic/add-edit-statistic.component'
      ).then((c) => c.AddEditStatisticComponent),
    data: { pageTitle: 'SETTINGS.STATISTICS.ADD.PAGE_TITLE', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-statistic/add-edit-statistic.component'
      ).then((c) => c.AddEditStatisticComponent),
    data: {
      pageTitle: 'SETTINGS.STATISTICS.EDIT.PAGE_TITLE',
      pageType: 'edit',
    },
  },
];
