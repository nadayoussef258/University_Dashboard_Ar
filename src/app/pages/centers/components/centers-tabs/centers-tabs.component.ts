import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-centers-tabs',
  imports: [TabsModule, RouterLink, RouterOutlet, TranslatePipe],
  templateUrl: './centers-tabs.component.html',
  styleUrls: ['./centers-tabs.component.css']
})
//
export class CentersTabsComponent extends BaseEditComponent implements OnInit {
  tabs = [
    {
      route: 'center-detail',
      label: 'PAGES.CENTER_DETAILS.MAIN.PAGE_TITLE',
      icon: 'pi pi-info-circle'
    },
    {
      route: 'center-member',
      label: 'PAGES.CENTER_MEMBERS.MAIN.PAGE_TITLE',
      icon: 'pi pi-users'
    }
  ];
}
