import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, TranslatePipe],
  styleUrls: ['./topbar.css'],
  template: `
    <div class="modern-topbar">
      <div class="topbar-container">
        <!-- Left Section: Logo & Menu Toggle -->
        <div class="topbar-left">
          <button
            class="menu-toggle-btn"
            (click)="layoutService.onMenuToggle()"
            aria-label="Toggle Menu"
          >
            <i class="pi pi-bars menu-icon"></i>
          </button>
          <a class="brand-logo" routerLink="/">
            <div class="logo-container">
              <img
                src="./assets/img/universitylogo.jpg"
                alt="Logo"
                class="logo-img"
              />
              <div class="logo-content">
                <span class="logo-title">{{'TITLE.PART_ONE' | translate}}</span>
                <span class="logo-subtitle"> {{'TITLE.PART_TWO' | translate}}</span>
              </div>
            </div>
          </a>
        </div>

        <!-- Right Section -->
        <div class="topbar-right">
          <div class="action-buttons">
            <!-- Notification -->
            <button class="action-btn notification-btn" aria-label="الإشعارات">
              <div class="hover-shine"></div>
              <i class="pi pi-bell notification-icon"></i>
              <span class="notification-badge">3</span>
            </button>

            <!-- Messages -->
            <button class="action-btn message-btn" aria-label="الرسائل">
              <div class="hover-shine"></div>
              <i class="pi pi-envelope message-icon"></i>
              <span class="message-badge">2</span>
            </button>

            <!-- Theme Toggle -->
            <button
              class="action-btn theme-btn"
              (click)="toggleDarkMode()"
              aria-label="تبديل المظهر"
            >
              <div class="hover-shine"></div>
              <i
                class="pi"
                [ngClass]="layoutService.isDarkTheme() ? 'pi-moon' : 'pi-sun'"
              ></i>
            </button>

            <!-- Settings -->
            <div class="relative">
              <button
                class="action-btn settings-btn "
                pStyleClass="@next"
                enterFromClass="hidden"
                enterActiveClass="animate-scalein"
                leaveToClass="hidden"
                leaveActiveClass="animate-fadeout"
                [hideOnOutsideClick]="true"
              >
                <div class="hover-shine"></div>
                <i class="pi pi-cog"></i>
              </button>
              <app-configurator  class="mt-1 -start-63! "/>
            </div>

            <!-- User Profile -->
            <div class="user-profile relative">
              <button
                class="user-btn"
                pStyleClass="@next"
                enterFromClass="hidden"
                enterActiveClass="animate-scalein"
                leaveToClass="hidden"
                leaveActiveClass="animate-fadeout"
                [hideOnOutsideClick]="true"
              >
                <img
                  src="./assets/img/user.png"
                  alt="User"
                  class="user-avatar"
                />
                <div class="user-info">
                  <span class="user-role">مدير النظام</span>
                </div>
                <i class="pi pi-chevron-down user-dropdown-icon"></i>
              </button>

              <!-- Dropdown Menu -->
              <div
                class="bg-white border rounded-lg border-gray-200 top-full shadow-lg mt-2 w-64 z-50 user-dropdown hidden absolute -start-44! md:-start-32! dark:bg-surface-800 dark:border-surface-700"
              >
                <div
                  class="border-b p-4 dropdown-header dark:border-surface-700"
                >
                  <div class="flex gap-3 items-center">
                    <img
                      src="./assets/img/logo.png"
                      alt="User"
                      class="rounded-full h-10 w-10"
                    />
                    <div>
                      <p class="font-semibold">أحمد محمد</p>
                      <p class="text-sm text-gray-500">ahmed@luxor.edu</p>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col p-2 dropdown-menu">
                  <a href="#" class="dropdown-item">
                    <i class="pi pi-user"></i>
                    <span>الملف الشخصي</span>
                  </a>
                  <a href="#" class="dropdown-item">
                    <i class="pi pi-cog"></i>
                    <span>الإعدادات</span>
                  </a>
                  <a href="#" class="dropdown-item">
                    <i class="pi pi-calendar"></i>
                    <span>التقويم</span>
                  </a>
                  <a href="#" class="dropdown-item">
                    <i class="pi pi-bell"></i>
                    <span>الإشعارات</span>
                  </a>
                  <div
                    class="border-t border-gray-200 my-2 dark:border-surface-700"
                  ></div>
                  <a href="#" class="text-red-500 dropdown-item logout">
                    <i class="pi pi-sign-out"></i>
                    <span>تسجيل الخروج</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AppTopbar {
  items!: MenuItem[];

  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme
    }));
  }
}
