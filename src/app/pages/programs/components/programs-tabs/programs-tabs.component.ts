import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-programs-tabs',
  imports: [TabsModule, RouterLink, RouterOutlet],
  templateUrl: './programs-tabs.component.html',
  styleUrls: ['./programs-tabs.component.css'],
})
//
export class ProgramsTabsComponent extends BaseEditComponent implements OnInit {
  tabs = [
    {
      route: 'program-detail',
      label: 'تفاصيل البرنامج',
      icon: 'pi pi-file',
    },
    {
      route: 'program-member',
      label: 'اعضاء البرنامج',
      icon: 'pi pi-user',
    },
  ];
}
