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
  selector: 'app-management-tabs',
  standalone: true,
  imports: [RouterModule, CardModule, CommonModule, TabsModule],
  templateUrl: './mangment-tabs.component.html',
  styleUrl: './mangment-tabs.component.css',
})
export class MangmentTabsComponent implements OnInit {
  tabs = [
    {
      route: 'main-managements',
      label: 'الإدارات الرئيسية',
      icon: 'pi pi-briefcase',
    },
    {
      route: 'management-attachments',
      label: 'مرفقات الإدارات',
      icon: 'pi pi-paperclip',
    },
    {
      route: 'management-details',
      label: 'تفاصيل الإدارات',
      icon: 'pi pi-info-circle',
    },
    {
      route: 'management-members',
      label: 'أعضاء الإدارات',
      icon: 'pi pi-users',
    },
  ];

  activeTab: string = ''; // التاب الافتراضي

  constructor(private router: Router) {}

  ngOnInit() {
    // ✅ عند أول تحميل
    const current = this.router.url.split('/').pop();
    this.activeTab = current ?? '/managements';

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
        this.activeTab = current ?? '/managements';
      });
  }
}
