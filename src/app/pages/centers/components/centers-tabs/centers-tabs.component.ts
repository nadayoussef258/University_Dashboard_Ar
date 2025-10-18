import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-centers-tabs',
  imports: [TabsModule, RouterLink, RouterOutlet],
  templateUrl: './centers-tabs.component.html',
  styleUrls: ['./centers-tabs.component.css'],
})
//
export class CentersTabsComponent extends BaseEditComponent implements OnInit {
  tabs = [
    {
      route: 'center-detail',
      label: 'تفاصيل المركز',
      icon: 'pi pi-info-circle',
    },
    {
      route: 'center-member',
      label: 'اعضاء المركز',
      icon: 'pi pi-users',
    },
  ];
}
