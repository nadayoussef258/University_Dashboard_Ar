import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import {
  ConfigService,
  errorInterceptor,
  loadingInterceptor,
  LoadingNgxSpinnerInterceptor,
} from './core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

const initializerConfigFn = (): any => {
  const configService = inject(ConfigService);
  return configService.loadAppConfig();
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initializerConfigFn),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        errorInterceptor,
        LoadingNgxSpinnerInterceptor,
      ])
    ),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',

          cssLayer: {
            name: 'primeng',
            order: 'base, theme, primeng',
          },
        },
      },
    }),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
};
