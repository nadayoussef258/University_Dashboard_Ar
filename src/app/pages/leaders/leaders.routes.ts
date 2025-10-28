import { Routes } from '@angular/router';

export const leadersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/leaders/leaders.component').then(
        (c) => c.LeaderComponent,
      ),
    data: { pageTitle: 'PAGES.LEADERS.MAIN.PAGE_TITLE', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-leader/add-edit-leader.component').then(
        (c) => c.AddEditLeaderComponent,
      ),
    data: { pageTitle: 'PAGES.LEADERS.ADD.PAGE_TITLE', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-leader/add-edit-leader.component').then(
        (c) => c.AddEditLeaderComponent,
      ),
    data: { pageTitle: 'PAGES.LEADERS.EDIT.PAGE_TITLE', pageType: 'edit' },
  },
];
