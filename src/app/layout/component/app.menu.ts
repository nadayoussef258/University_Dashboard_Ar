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
      @if (!item.separator) {
        <li app-menuitem [item]="item" [index]="$index" [root]="true"></li>
      } @else {
        <li class="menu-separator"></li>
      }
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
            label: 'القوائم',
            icon: 'pi pi-bars',
            routerLink: ['/pages/settings/menu-items'],
          },
        ],
      },
      {
        label: 'الشاشات',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'القادة',
            icon: 'pi pi-star',
            routerLink: ['/pages/leaders'],
          },
          {
            label: 'الادارات',
            icon: 'pi pi-sitemap',
            items: [
              {
                label: 'الإدارات الرئيسية',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/managements'],
              },
              {
                label: 'تفاصيل الإدارات',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/management-details'],
              },
              {
                label: 'أعضاء الإدارات',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/management-members'],
              },
            ],
          },

          {
            label: 'الوحدات',
            icon: 'pi pi-users',
            items: [
              {
                label: 'الوحدات الرئيسية',
                // icon: 'pi pi-building',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/units'],
              },
              {
                label: 'تفاصيل الوحدات',
                // icon: 'pi pi-list',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/unit-details'],
              },
              {
                label: 'أعضاء الوحدات',
                // icon: 'pi pi-users',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/unit-members'],
              },
            ],
          },
          {
            label: 'المراكز',
            icon: 'pi pi-sitemap',
            items: [
              {
                label: 'المراكز الرئيسية',
                // icon: 'pi pi-building',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/centers'],
              },
              {
                label: 'تفاصيل المراكز',
                // icon: 'pi pi-info-circle',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/center-details'],
              },
              {
                label: 'أعضاء المراكز',
                // icon: 'pi pi-users',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/center-members'],
              },
            ],
          },
          {
            label: 'البرامج',
            icon: 'pi pi-briefcase',
            items: [
              {
                label: 'البرامج الرئيسية',
                // icon: 'pi pi-th-large',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/programs'],
              },
              {
                label: 'تفاصيل البرامج',
                // icon: 'pi pi-file',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/program-details'],
              },
              {
                label: 'أعضاء البرامج',
                // icon: 'pi pi-user',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/program-members'],
              },
            ],
          },
          {
            label: 'القطاعات',
            icon: 'pi pi-th-large',
            items: [
              {
                label: 'القطاعات الرئيسية',
                // icon: 'pi pi-building',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sectors'],
              },
              {
                label: 'تفاصيل القطاعات',
                // icon: 'pi pi-list',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-details'],
              },
              {
                label: 'أعضاء القطاعات',
                // icon: 'pi pi-users',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-members'],
              },
              {
                label: 'منشورات القطاعات',
                // icon: 'pi pi-send',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-posts'],
              },
              {
                label: 'برامج القطاعات',
                // icon: 'pi pi-sliders-h',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-programs'],
              },
              {
                label: 'وحدات القطاعات',
                // icon: 'pi pi-building',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-units'],
              },
              {
                label: 'خدمات القطاعات',
                // icon: 'pi  pi-cog',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-services'],
              },
            ],
          },
          {
            label: 'الاخبار والاحدات',
            icon: 'pi pi-calendar',
            routerLink: ['/pages/posts'],
          },
          {
            label: 'أعضاء هيئة التدريس',
            icon: 'pi pi-user-edit',
            routerLink: ['/pages/members'],
          },
          {
            label: 'عن الجامعة',
            icon: 'pi pi-university',
            routerLink: ['/pages/about'],
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
            icon: 'pi pi-file',
            routerLink: ['/pages/page-s'],
          },
        ],
      },
    ];
  }
}
