import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-add-edit-main-info-unit',
  imports: [TabsModule, RouterLink, RouterOutlet],
  templateUrl: './add-edit-main-info-unit.component.html',
  styleUrls: ['./add-edit-main-info-unit.component.css'],
})
//
export class AddEditMainInfoUnitComponent
  extends BaseEditComponent
  implements OnInit
{
  managementId: string = '';

  tabs = [
    {
      route: 'unit-detail',
      label: 'تفاصيل الوحدة',
      icon: 'pi pi-chart-line',
    },
    { route: 'unit-member', label: 'عضو الوحدة', icon: 'pi pi-users' },
  ];
}
