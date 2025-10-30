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
  </ul>`
})
export class AppMenu {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'MENU_LABELS.HOME',
        items: [
          {
            label: 'MENU_LABELS.DASHBOARD',
            icon: 'pi pi-home',
            routerLink: ['/']
          }
        ]
      },
      {
        label: 'MENU_LABELS.SETTINGS',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'MENU_LABELS.CONTACT_INFO',
            icon: 'pi pi-envelope',
            routerLink: ['/pages/settings/contacts']
          },
          {
            label: 'MENU_LABELS.UNIVERSITY_SERVICES',
            icon: 'pi pi-globe',
            routerLink: ['/pages/settings/services']
          },
          {
            label: 'MENU_LABELS.UNIVERSITY_LOGO',
            icon: 'pi pi-image',
            routerLink: ['/pages/settings/logos']
          },
          {
            label: 'MENU_LABELS.HERO_IMAGES',
            icon: 'pi pi-images',
            routerLink: ['/pages/settings/hero-sections']
          },
          {
            label: 'MENU_LABELS.STATISTICS',
            icon: 'pi pi-chart-bar',
            routerLink: ['/pages/settings/statistics']
          },
          {
            label: 'MENU_LABELS.MENU_TYPES',
            icon: 'pi pi-sitemap',
            routerLink: ['/pages/settings/menu-types']
          },
          {
            label: 'MENU_LABELS.MENUS',
            icon: 'pi pi-bars',
            routerLink: ['/pages/settings/menu-items']
          }
        ]
      },
      {
        label: 'MENU_LABELS.SCREENS',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'MENU_LABELS.LEADERS',
            icon: 'pi pi-star',
            routerLink: ['/pages/leaders']
          },
          {
            label: 'MENU_LABELS.MANAGEMENTS',
            icon: 'pi pi-sitemap',
            items: [
              {
                label: 'MENU_LABELS.MAIN_MANAGEMENTS',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/managements']
              },
              {
                label: 'MENU_LABELS.MANAGEMENT_DETAILS',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/management-details']
              },
              {
                label: 'MENU_LABELS.MANAGEMENT_MEMBERS',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/management-members']
              }
            ]
          },

          {
            label: 'MENU_LABELS.UNITS',
            icon: 'pi pi-users',
            items: [
              {
                label: 'MENU_LABELS.MAIN_UNITS',
                // icon: 'pi pi-building',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/units']
              },
              {
                label: 'MENU_LABELS.UNIT_DETAILS',
                // icon: 'pi pi-list',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/unit-details']
              },
              {
                label: 'MENU_LABELS.UNIT_MEMBERS',
                // icon: 'pi pi-users',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/unit-members']
              }
            ]
          },
          {
            label: 'MENU_LABELS.CENTERS',
            icon: 'pi pi-sitemap',
            items: [
              {
                label: 'MENU_LABELS.MAIN_CENTERS',
                // icon: 'pi pi-building',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/centers']
              },
              {
                label: 'MENU_LABELS.CENTER_DETAILS',
                // icon: 'pi pi-info-circle',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/center-details']
              },
              {
                label: 'MENU_LABELS.CENTER_MEMBERS',
                // icon: 'pi pi-users',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/center-members']
              }
            ]
          },
          {
            label: 'MENU_LABELS.PROGRAMS',
            icon: 'pi pi-briefcase',
            items: [
              {
                label: 'MENU_LABELS.MAIN_PROGRAMS',
                // icon: 'pi pi-th-large',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/programs']
              },
              {
                label: 'MENU_LABELS.PROGRAM_DETAILS',
                // icon: 'pi pi-file',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/program-details']
              },
              {
                label: 'MENU_LABELS.PROGRAM_MEMBERS',
                // icon: 'pi pi-user',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/program-members']
              }
            ]
          },
          {
            label: 'MENU_LABELS.SECTORS',
            icon: 'pi pi-th-large',
            items: [
              {
                label: 'MENU_LABELS.MAIN_SECTORS',
                // icon: 'pi pi-building',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sectors']
              },
              {
                label: 'MENU_LABELS.SECTOR_DETAILS',
                // icon: 'pi pi-list',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-details']
              },
              {
                label: 'MENU_LABELS.SECTOR_MEMBERS',
                // icon: 'pi pi-users',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-members']
              },
              {
                label: 'MENU_LABELS.SECTOR_POSTS',
                // icon: 'pi pi-send',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-posts']
              },
              {
                label: 'MENU_LABELS.SECTOR_PROGRAMS',
                // icon: 'pi pi-sliders-h',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-programs']
              },
              {
                label: 'MENU_LABELS.SECTOR_UNITS',
                // icon: 'pi pi-building',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-units']
              },
              {
                label: 'MENU_LABELS.SECTOR_SERVICES',
                // icon: 'pi  pi-cog',
                icon: 'pi pi-angle-left',
                routerLink: ['/pages/sector-services']
              }
            ]
          },
          {
            label: 'MENU_LABELS.NEWS_EVENTS',
            icon: 'pi pi-calendar',
            routerLink: ['/pages/posts']
          },
          {
            label: 'MENU_LABELS.FACULTY_MEMBERS',
            icon: 'pi pi-user-edit',
            routerLink: ['/pages/members']
          },
          {
            label: 'MENU_LABELS.ABOUT_UNIVERSITY',
            icon: 'pi pi-university',
            routerLink: ['/pages/about']
          },
          {
            label: 'MENU_LABELS.ACTIONS',
            icon: 'pi pi-calendar-plus',
            routerLink: ['/pages/settings/actions']
          },
          {
            label: 'MENU_LABELS.CATEGORIES',
            icon: 'pi pi-tags',
            routerLink: ['/pages/settings/categories']
          },
          {
            label: 'MENU_LABELS.PAGES',
            icon: 'pi pi-file',
            routerLink: ['/pages/page-s']
          }
        ]
      }
    ];
  }
}
