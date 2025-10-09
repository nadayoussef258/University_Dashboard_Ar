import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule],
styleUrls: ['./topbar.css'],
  template: `<div class="modern-topbar" dir="rtl">
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
              <span class="logo-title">جامعة الأقصر</span>
              <span class="logo-subtitle">نظام إدارة المعلومات</span>
            </div>
          </div>
        </a>
      </div>

      <!-- Center Section: Search (Optional) -->
      <div class="topbar-center">
        <div class="search-container">
          <i class="pi pi-search search-icon"></i>
          <input type="text" class="search-input" placeholder="البحث..." />
        </div>
      </div>

      <!-- Right Section: Actions & User Menu -->
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
          <button class="action-btn settings-btn" aria-label="الإعدادات">
            <div class="hover-shine"></div>
            <i class="pi pi-cog"></i>
          </button>

          <!-- User Profile -->
          <div class="user-profile">
            <button
              class="user-btn"
              pStyleClass="@next"
              enterFromClass="hidden"
              enterActiveClass="animate-scalein"
              leaveToClass="hidden"
              leaveActiveClass="animate-fadeout"
              [hideOnOutsideClick]="true"
            >
              <img src="./assets/img/user.png" alt="User" class="user-avatar" />
              <div class="user-info">
                <span class="user-role">مدير النظام</span>
              </div>
              <i class="pi pi-chevron-down user-dropdown-icon"></i>
            </button>

            <!-- User Dropdown Menu -->
            <div class="user-dropdown">
              <div class="dropdown-header">
                <div class="user-profile-info">
                  <img
                    src="./assets/img/logo.jpg"
                    alt="User"
                    class="profile-avatar"
                  />
                  <div class="profile-details">
                    <span class="profile-name">أحمد محمد</span>
                    <span class="profile-email">ahmed@luxor.edu</span>
                  </div>
                </div>
              </div>
              <div class="dropdown-menu">
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
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item logout">
                  <i class="pi pi-sign-out"></i>
                  <span>تسجيل الخروج</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class AppTopbar {
  items!: MenuItem[];

  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}
