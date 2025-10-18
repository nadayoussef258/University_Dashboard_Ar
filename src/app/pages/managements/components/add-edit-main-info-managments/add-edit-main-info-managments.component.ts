import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-add-edit-main-info-managments',
  imports: [TabsModule, RouterLink, RouterOutlet],
  templateUrl: './add-edit-main-info-managments.component.html',
  styleUrls: ['./add-edit-main-info-managments.component.css'],
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
      label: 'تفاصيل الادارة',
      icon: 'pi pi-chart-line',
    },
    { route: 'management-member', label: 'عضو الادارة', icon: 'pi pi-users' },
  ];
}
