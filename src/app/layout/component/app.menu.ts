import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
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
          { label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      },
      {
        label: '',
        items: [
          {
            label: 'الاعدادات',
            icon: 'pi pi-fw pi-spin pi-cog',
            // routerLink: ['/pages'],
            items: [
              {
                label: 'معلومات التواصل',
                icon: 'pi pi-briefcase',
                routerLink: ['/pages/settings/contacts'],
              },
              {
                label: 'خدمات الجامعة',
                icon: 'pi pi-briefcase',
                routerLink: ['/pages/settings/services'],
              },
              {
                label: 'شعار الجامعة',
                icon: 'pi pi-briefcase',
                routerLink: ['/pages/settings/logos'],
              },
              {
                label: 'صور رئيسية',
                icon: 'pi pi-briefcase',
                routerLink: ['/pages/settings/sliderhero'],
              },
              {
                label: 'الاحصائيات ',
                icon: 'pi pi-briefcase',
                routerLink: ['/pages/settings/statistics'],
              },
            ],
          },
        ],
      },
      {
        label: 'الشاشات',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          // tabs
          {
            label: 'الادارات',
            icon: 'pi pi-tags',
            routerLink: ['/pages/mangment'],
          },
          // tabs
          {
            label: 'الوحدات',
            icon: 'pi pi-user',
            routerLink: ['/pages/units'],
          },
          // tabs
          {
            label: 'القطاعات',
            icon: 'pi pi-user',
            routerLink: ['/pages/sectors'],
          },
          // tabs
          {
            label: 'الاخبار والاحدات',
            icon: 'pi pi-briefcase',
            routerLink: ['/pages/posts'],
          },
          // tabs
          {
            label: 'اعضاء هيئة التدريس',
            icon: 'pi pi-briefcase',
            routerLink: ['/pages/members'],
          },
          {
            label: 'القوائم',
            icon: 'pi pi-user',
            routerLink: ['/pages/menus'],
          },
          {
            label: 'عن الجامعة',
            icon: 'pi pi-user',
            routerLink: ['/pages/overView'],
          },
          {
            label: 'الصور',
            icon: 'pi pi-building',
            routerLink: ['/pages/media'],
          },
          // tabs
          {
            label: 'البرامج',
            icon: 'pi pi-building',
            routerLink: ['/pages/programes'],
          },
          {
            label: 'الأحداث',
            icon: 'pi pi-briefcase',
            routerLink: ['/pages/settings/actions'],
          },
          {
            label: 'التصنيفات',
            icon: 'pi pi-briefcase',
            routerLink: ['/pages/settings/categories'],
          },
        ],
      },
    ];
  }
}
