import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sectors-tabs',
  imports: [TabsModule, RouterLink, RouterOutlet, TranslatePipe],
  templateUrl: './sectors-tabs.component.html',
  styleUrls: ['./sectors-tabs.component.css'],
})
//
export class SectorsTabsComponent extends BaseEditComponent implements OnInit {
  tabs = [
    {
      route: 'sector-detail',
      label: 'PAGES.SECTOR_DETAILS.MAIN.PAGE_TITLE',
      icon: 'pi pi-info-circle',
    },
    {
      route: 'sector-member',
      label: 'PAGES.SECTOR_MEMBERS.MAIN.PAGE_TITLE',
      icon: 'pi pi-users',
    },
    {
      route: 'sector-post',
      label: 'PAGES.SECTOR_POSTS.MAIN.PAGE_TITLE',
      icon: 'pi pi-send',
    },
    {
      route: 'sector-program',
      label: 'PAGES.SECTOR_PROGRAMS.MAIN.PAGE_TITLE',
      icon: 'pi pi-sliders-h',
    },
    {
      route: 'sector-service',
      label: 'PAGES.SECTOR_SERVICES.MAIN.PAGE_TITLE',
      icon: 'pi  pi-cog',
    },
    {
      route: 'sector-unit',
      label: 'PAGES.SECTOR_UNITS.MAIN.PAGE_TITLE',
      icon: 'pi pi-building',
    },
  ];
}
