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
  standalone: true,
  imports: [RouterModule, CardModule, CommonModule, TabsModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent implements OnInit {
  tabs = [
    {
      route: 'main-managements',
      label: 'الإدارات الرئيسية',
      icon: 'pi pi-sitemap',
    },
    {
      route: 'management-attachments',
      label: 'المرفقات',
      icon: 'pi pi-paperclip',
    },
  ];

  activeTab: string = ''; // التاب الافتراضي

  constructor(private router: Router) {}

  ngOnInit() {
    // ✅ عند أول تحميل
    const current = this.router.url.split('/').pop();
    this.activeTab = current ?? '/main-managements';

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
        this.activeTab = current ?? '/main-managements';
      });
  }
}
