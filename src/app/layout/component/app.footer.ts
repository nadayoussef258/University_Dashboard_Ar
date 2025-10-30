import { IconFieldModule } from 'primeng/iconfield';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  template: `<div class="layout-footer dark:text-gray-900">
    <p class="site-footer__bottom-text">
      {{ 'FOOTER.COPYRIGHT' | translate }}
      <a href="#" class="hover:text-red-500! dark:hover:text-purple-800!">
        {{ 'FOOTER.NAME' | translate }}
      </a>
      {{ currentYear }}
    </p>
  </div>`
})
export class AppFooter {
  currentYear = new Date().getFullYear();
}
