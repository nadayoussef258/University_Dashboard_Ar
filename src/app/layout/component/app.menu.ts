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
    <ng-container *ngFor="let item of model; let i = index">
      <li
        app-menuitem
        *ngIf="!item.separator"
        [item]="item"
        [index]="i"
        [root]="true"
      ></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul> `,
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
                routerLink: ['/pages/settings/contact'],
              },
              {
                label: 'خدمات الجامعة',
                icon: 'pi pi-briefcase',
                routerLink: ['/pages/settings/service'],
              },
              {
                label: 'شعار الجامعة',
                icon: 'pi pi-briefcase',
                routerLink: ['/pages/settings/logo'],
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
          {
            label: 'الادارات',
            icon: 'pi pi-tags',
            routerLink: ['/pages/mangment'],
          },
          {
            label: 'الوحدات',
            icon: 'pi pi-user',
            routerLink: ['/pages/units'],
          },
          {
            label: 'القطاعات',
            icon: 'pi pi-user',
            routerLink: ['/pages/sectors'],
          },
          {
            label: 'الاخبار والاحدات',
            icon: 'pi pi-briefcase',
            routerLink: ['/pages/posts'],
          },
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
