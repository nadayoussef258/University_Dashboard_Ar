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
                label: 'الأحداث',
                icon: 'pi pi-briefcase',
                routerLink: ['/pages/settings/actions'],
              }, {
                label: 'التصنيفات',
                icon: 'pi pi-briefcase',
                routerLink: ['/pages/settings/categories'],
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
            label: 'الاصناف',
            icon: 'pi pi-tags',
            routerLink: ['/pages/items'],
          },
          {
            label: 'العملاء',
            icon: 'pi pi-user',
            routerLink: ['/pages/clients'],
          },
          {
            label: 'الموردين',
            icon: 'pi pi-user',
            routerLink: ['/pages/sellers'],
          },
          {
            label: 'الشيفتات',
            icon: 'pi pi-briefcase',
            routerLink: ['/pages/shifts'],
          },
          {
            label: 'ادوار المستخدمين',
            icon: 'pi pi-briefcase',
            routerLink: ['/pages/user-user-group'],
          },
          {
            label: 'صلاحيات الادوار',
            icon: 'pi pi-user',
            routerLink: ['/pages/user-groups-user-roles'],
          },
          {
            label: 'فروع المستخدمين',
            icon: 'pi pi-user',
            routerLink: ['/pages/user-branchs'],
          },
          {
            label: 'org-structure-job-titles',
            icon: 'pi pi-building',
            routerLink: ['/pages/org-structure-job-titles'],
          },
          {
            label: 'الأقسام',
            icon: 'pi pi-building',
            routerLink: ['/pages/departments'],
          },
        ],
      },
    ];
  }
}
