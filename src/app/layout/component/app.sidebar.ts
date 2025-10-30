import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';

@Component({
  selector: 'app-sidebar',

  imports: [AppMenu],
  template: ` <div class="layout-sidebar" dir="rtl">
    <app-menu></app-menu>
  </div>`
})
export class AppSidebar {
  constructor(public el: ElementRef) {}
}
