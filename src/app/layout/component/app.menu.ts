import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
  selector: 'app-menu',

  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `<ul class="layout-menu">
    @for (item of model; track $index) {
    <!--  -->
    @if (!item.separator) {
    <li app-menuitem [item]="item" [index]="$index" [root]="true"></li>
    } @else {
    <li class="menu-separator"></li>
    }
    <!--  -->
    }
  </ul>`,
})
export class AppMenu {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'الرئيسية',
        items: [
          {
            label: 'لوحة التحكم',
            icon: 'pi pi-home',
            routerLink: ['/'],
          },
        ],
      },
      {
        label: '',
        items: [
          {
            label: 'الاعدادات',
            icon: 'pi pi-cog',
            items: [
              {
                label: 'معلومات التواصل',
                icon: 'pi pi-envelope',
                routerLink: ['/pages/settings/contacts'],
              },
              {
                label: 'خدمات الجامعة',
                icon: 'pi pi-globe',
                routerLink: ['/pages/settings/services'],
              },
              {
                label: 'شعار الجامعة',
                icon: 'pi pi-image',
                routerLink: ['/pages/settings/logos'],
              },
              {
                label: 'صور رئيسية',
                icon: 'pi pi-images',
                routerLink: ['/pages/settings/hero-sections'],
              },
              {
                label: 'الاحصائيات',
                icon: 'pi pi-chart-bar',
                routerLink: ['/pages/settings/statistics'],
              },
              {
                label: 'أنواع القوائم',
                icon: 'pi pi-sitemap',
                routerLink: ['/pages/settings/menu-types'],
              },
              {
                label: 'عناصر القوائم',
                icon: 'pi pi-sitemap',
                routerLink: ['/pages/settings/menu-items'],
              },
            ],
          },
        ],
      },
      {
        label: 'الشاشات',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'الادارات',
            icon: 'pi pi-sitemap',
            routerLink: ['/pages/managements'],
          },
          {
            label: 'الوحدات',
            icon: 'pi pi-users',
            routerLink: ['/pages/units'],
          },
          {
            label: 'القطاعات',
            icon: 'pi pi-th-large',
            routerLink: ['/pages/sectors'],
          },
          {
            label: 'الاخبار والاحدات',
            icon: 'pi pi-calendar',
            routerLink: ['/pages/posts'],
          },
          {
            label: 'اعضاء هيئة التدريس',
            icon: 'pi pi-user-edit',
            routerLink: ['/pages/members'],
          },
          {
            label: 'القوائم',
            icon: 'pi pi-bars',
            routerLink: ['/pages/menus'],
          },
          {
            label: 'عن الجامعة',
            icon: 'pi pi-info-circle',
            routerLink: ['/pages/about'],
          },
          {
            label: 'الصور',
            icon: 'pi pi-camera',
            routerLink: ['/pages/media'],
          },
          {
            label: 'البرامج',
            icon: 'pi pi-book',
            routerLink: ['/pages/programes'],
          },
          {
            label: 'الأحداث',
            icon: 'pi pi-calendar-plus',
            routerLink: ['/pages/settings/actions'],
          },
          {
            label: 'التصنيفات',
            icon: 'pi pi-tags',
            routerLink: ['/pages/settings/categories'],
          },
          {
            label: 'الصفحات',
            icon: 'pi pi-sitemap',
            routerLink: ['/pages/page-s'],
          },
          {
            label: 'المنشورات',
            icon: 'pi pi-sitemap',
            routerLink: ['/pages/posts'],
          },
        ],
      },
    ];
  }
}
