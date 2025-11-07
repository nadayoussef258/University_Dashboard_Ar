import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
  selector: 'app-access',

  imports: [ButtonModule, RouterModule, RippleModule, AppFloatingConfigurator, ButtonModule],
  template: ` <app-floating-configurator />
    <div class="flex min-h-screen min-w-screen bg-surface-50 items-center justify-center overflow-hidden dark:bg-surface-950">
      <div class="flex flex-col items-center justify-center">
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)">
          <div class="flex flex-col bg-surface-0 w-full py-20 px-8 items-center sm:px-20 dark:bg-surface-900" style="border-radius: 53px">
            <div class="flex flex-col gap-4 items-center">
              <div class="rounded-full flex border-2 border-orange-500 justify-center items-center" style="width: 3.2rem; height: 3.2rem">
                <i class="text-orange-500 pi pi-fw pi-lock text-2xl!"></i>
              </div>
              <h1 class="font-bold mb-2 text-surface-900 text-4xl lg:text-5xl dark:text-surface-0">ليس لديك صلاحية</h1>
              <span class="text-muted-color mb-8"> ليس لديك الأذونات اللازمة . يرجى التواصل مع المسؤولين</span>
              <img src="https://primefaces.org/cdn/templates/sakai/auth/asset-access.svg" alt="Access denied" class="mb-8" width="80%" />
              <div class="mt-8 text-center col-span-12">
                <p-button label="الذهاب الى لوحة التحكم" routerLink="/" severity="warn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
})
export class Access {}
