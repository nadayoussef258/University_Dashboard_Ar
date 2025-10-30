import { Routes } from '@angular/router';

export const contactsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/contacts/contacts.component').then((c) => c.ContactsComponent),
    data: { pageTitle: 'SETTINGS.CONTACTS.MAIN.PAGE_TITLE', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-contact/add-edit-contact.component').then((c) => c.AddEditContactComponent),
    data: { pageTitle: 'SETTINGS.CONTACTS.ADD.PAGE_TITLE', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-contact/add-edit-contact.component').then((c) => c.AddEditContactComponent),
    data: { pageTitle: 'SETTINGS.CONTACTS.EDIT.PAGE_TITLE', pageType: 'edit' }
  }
];
