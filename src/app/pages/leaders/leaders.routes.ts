import { Routes } from '@angular/router';

export const leadersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/leaders/leaders.component').then(
        (c) => c.LeaderComponent,
      ),
    data: { pageTitle: 'القادة', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-leader/add-edit-leader.component').then(
        (c) => c.AddEditLeaderComponent,
      ),
    data: { pageTitle: 'اضافة بيانات القائد', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-leader/add-edit-leader.component').then(
        (c) => c.AddEditLeaderComponent,
      ),
    data: { pageTitle: 'تعديل بيانات القائد', pageType: 'edit' },
  },
];
