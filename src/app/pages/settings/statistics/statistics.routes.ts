import { Routes } from '@angular/router';

export const statisticsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/statistics/statistics.component').then(
        (c) => c.StatisticsComponent
      ),
    data: { pageTitle: 'الأحصائيات', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-statistic/add-edit-statistic.component'
      ).then((c) => c.AddEditStatisticComponent),
    data: { pageTitle: 'اضافة احصائية', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-statistic/add-edit-statistic.component'
      ).then((c) => c.AddEditStatisticComponent),
    data: { pageTitle: 'تعديل  احصائية', pageType: 'edit' },
  },
];
