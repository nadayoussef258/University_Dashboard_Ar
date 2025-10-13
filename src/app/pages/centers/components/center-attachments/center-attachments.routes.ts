import { Routes } from '@angular/router';

export const centerAttachmentsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/center-attachments/center-attachments.component').then(
        (c) => c.CenterAttachmentsComponent
      ),
    data: { pageTitle: 'مرفقات المراكز', pageType: 'list' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './components/add-edit-center-attachment/add-edit-center-attachment.component'
      ).then((c) => c.AddEditCenterAttachmentComponent),
    data: { pageTitle: 'اضافة مرفق للمركز', pageType: 'add' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './components/add-edit-center-attachment/add-edit-center-attachment.component'
      ).then((c) => c.AddEditCenterAttachmentComponent),
    data: { pageTitle: 'تعديل مرفق المركز', pageType: 'edit' },
  },
];
