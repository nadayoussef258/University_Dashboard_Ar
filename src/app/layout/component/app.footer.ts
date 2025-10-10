import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `<div class="layout-footer dark:text-gray-900">
    <p class="site-footer__bottom-text">
      جميع الحقوق محفوظة &copy;
      <script>
        document.write(new Date().getFullYear());
      </script>
      <a href="#" class="hover:text-red-500! dark:hover:text-purple-800!">
        جامعة الأقصر</a
      >
      {{ currentYear }}
    </p>
  </div>`,
})
export class AppFooter {
  currentYear = new Date().getFullYear();
}
