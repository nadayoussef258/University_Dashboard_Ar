import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-sectors-tabs',
  imports: [TabsModule, RouterLink, RouterOutlet],
  templateUrl: './sectors-tabs.component.html',
  styleUrls: ['./sectors-tabs.component.css'],
})
//
export class SectorsTabsComponent extends BaseEditComponent implements OnInit {
  tabs = [
    {
      route: 'sector-detail',
      label: 'تفاصيل القطاع',
      icon: 'pi pi-info-circle',
    },
    {
      route: 'sector-member',
      label: 'اعضاء القطاع',
      icon: 'pi pi-users',
    },
    {
      route: 'sector-post',
      label: 'منشورات القطاع',
      icon: 'pi pi-send',
    },
    {
      route: 'sector-program',
      label: 'برامج القطاع',
      icon: 'pi pi-sliders-h',
    },
    {
      route: 'sector-service',
      label: 'خدمات القطاع',
      icon: 'pi  pi-cog',
    },
    {
      route: 'sector-unit',
      label: 'وحدات القطاع',
      icon: 'pi pi-building',
    },
  ];
}
