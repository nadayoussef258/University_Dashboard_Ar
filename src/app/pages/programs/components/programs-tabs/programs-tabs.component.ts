import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-programs-tabs',
  imports: [TabsModule, RouterLink, RouterOutlet, TranslatePipe],
  templateUrl: './programs-tabs.component.html',
  styleUrls: ['./programs-tabs.component.css']
})
//
export class ProgramsTabsComponent extends BaseEditComponent implements OnInit {
  tabs = [
    {
      route: 'program-detail',
      label: 'PAGES.PROGRAM_DETAILS.MAIN.PAGE_TITLE',
      icon: 'pi pi-file'
    },
    {
      route: 'program-member',
      label: 'PAGES.PROGRAM_DETAIL.MAIN.PAGE_TITLE',
      icon: 'pi pi-user'
    }
  ];
}
