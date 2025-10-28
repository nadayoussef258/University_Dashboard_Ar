import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-main-info-managements',
  imports: [TabsModule, RouterLink, RouterOutlet, TranslatePipe],
  templateUrl: './managements-tabs.component.html',
  styleUrls: ['./managements-tabs.component.css'],
})
//
export class AddEditMainInfoManagementComponent
  extends BaseEditComponent
  implements OnInit
{
  managementId: string = '';

  tabs = [
    {
      route: 'management-detail',
      label: 'PAGES.MANAGEMENT_DETAILS.MAIN.PAGE_TITLE',
      icon: 'pi pi-chart-line',
    },
    {
      route: 'management-member',
      label: 'PAGES.MANAGEMENT_MEMBERS.MAIN.PAGE_TITLE',
      icon: 'pi pi-users',
    },
  ];
}
