import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { TranslationService } from './shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('university_dashboard');

  private translate = inject(TranslationService);

  // changeLang() {
  //   this.translate.changeLanguage();
  // }
  // constructor() {
  //   this.translate.addLangs(['ar', 'en']);
  //   this.translate.setFallbackLang('en');
  //   this.translate.use('en');
  // }
}
