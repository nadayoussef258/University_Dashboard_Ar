import { Routes } from '@angular/router';

export const contactsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/contacts/contacts.component').then(
        (c) => c.ContactsComponent
      ),
    data: { pageTitle: 'تفاصيل الأتصال', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-contact/add-edit-contact.component').then(
        (c) => c.AddEditContactComponent
      ),
    data: { pageTitle: 'اضافة تفاصيل الاتصال', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-contact/add-edit-contact.component').then(
        (c) => c.AddEditContactComponent
      ),
    data: { pageTitle: 'تعديل تفاصيل الاتصال', pageType: 'edit' },
  },
];
