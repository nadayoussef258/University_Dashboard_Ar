import { Routes } from '@angular/router';

export const actionsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './pages/management-attachments/management-attachments.component'
      ).then((c) => c.ManagementAttachmentsComponent),
    data: { pageTitle: 'الأحداث', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-management-attachment/add-edit-management-attachment.component'
      ).then((c) => c.AddEditManagementAttachmentComponent),
    data: { pageTitle: 'اضافة حدث', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-management-attachment/add-edit-management-attachment.component'
      ).then((c) => c.AddEditManagementAttachmentComponent),
    data: { pageTitle: 'تعديل حدث', pageType: 'edit' },
  },
];
