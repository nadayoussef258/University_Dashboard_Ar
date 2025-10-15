import { Component, inject, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-actions',

  imports: [RouterModule, CardModule, CommonModule, TabsModule],
  templateUrl: './center-tabs.component.html',
  styleUrl: './center-tabs.component.css',
})
export class CenterTabsComponent implements OnInit {
  tabs = [
    {
      route: 'main-centers',
      label: 'المراكز',
      icon: 'pi pi-building',
    },
    {
      route: 'center-attachments',
      label: 'مرفقات المراكز',
      icon: 'pi pi-paperclip',
    },
    {
      route: 'center-details',
      label: 'تفاصيل المراكز',
      icon: 'pi pi-info-circle',
    },
    {
      route: 'center-members',
      label: 'أعضاء المراكز',
      icon: 'pi pi-users',
    },
  ];

  activeTab: string = 'centers';

  constructor(private router: Router) {}

  ngOnInit() {
    // ✅ عند أول تحميل
    const current = this.router.url.split('/').pop();
    this.activeTab = current ?? '/centers';

    // ✅ أثناء أي تنقل لاحق
    // ✅ نحدث التاب النشطة بناءً على المسار الحالي فقط عند NavigationEnd (علشان الأداء)
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        const current = event.urlAfterRedirects.split('/').pop();
        this.activeTab = current ?? '/centers';
      });
  }
}
