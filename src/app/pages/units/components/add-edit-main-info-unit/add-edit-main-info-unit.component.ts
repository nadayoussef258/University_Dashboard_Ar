import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-main-info-unit',
  imports: [TabsModule, RouterLink, RouterOutlet, TranslatePipe],
  templateUrl: './add-edit-main-info-unit.component.html',
  styleUrls: ['./add-edit-main-info-unit.component.css'],
})
//
export class AddEditMainInfoUnitComponent
  extends BaseEditComponent
  implements OnInit
{
  tabs = [
    {
      route: 'unit-detail',
      label: 'PAGES.UNIT_DETAILS.MAIN.PAGE_TITLE',
      icon: 'pi pi-chart-line',
    },
    {
      route: 'unit-member',
      label: 'PAGES.UNIT_MEMBERS.MAIN.PAGE_TITLE',
      icon: 'pi pi-users',
    },
  ];
}
