import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Primeng
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { StyleClassModule } from 'primeng/styleclass';
import { IconFieldModule } from 'primeng/iconfield';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUpload } from 'primeng/fileupload';
import { Select } from 'primeng/select';

// Custom shared pipes & directives
import { ValidationHandlerPipe } from './pipes/validation-handler.pipe';
// (add other custom pipes/directives here...)
import { SpecificLanguageDirective } from './directives/specific-language.directive';
// (add other custom directives here...)

const PRIMENG_MODULES = [
  ButtonModule,
  CheckboxModule,
  TableModule,
  CardModule,
  EditorModule,
  ToolbarModule,
  RippleModule,
  DialogModule,
  StyleClassModule,
  IconFieldModule,
  PasswordModule,
  InputTextModule,
  BadgeModule,
  ProgressBarModule,
  DatePickerModule,
  FileUpload,
  Select
];

const ANGULAR_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TranslateModule];

const CUSTOM_PIPES_DIRECTIVES = [
  ValidationHandlerPipe,
  SpecificLanguageDirective
  // add more here...
];

@NgModule({
  imports: [...ANGULAR_MODULES, ...PRIMENG_MODULES, ...CUSTOM_PIPES_DIRECTIVES],
  // Remove declarations!
  exports: [...ANGULAR_MODULES, ...PRIMENG_MODULES, ...CUSTOM_PIPES_DIRECTIVES]
})
export class SharedModule {}
