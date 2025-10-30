import { Routes } from '@angular/router';

export const heroSectionsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/hero-sections/hero-sections.component').then((c) => c.HeroSectionsComponent),
    data: { pageTitle: 'الواجهة الرئيسية', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-hero-section/add-edit-hero-section.component').then((c) => c.AddEditHeroSectionComponent),
    data: { pageTitle: 'اضافة الواجهة الرئيسية', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-hero-section/add-edit-hero-section.component').then((c) => c.AddEditHeroSectionComponent),
    data: { pageTitle: 'تعديل الواجهة الرئيسية', pageType: 'edit' }
  }
];
