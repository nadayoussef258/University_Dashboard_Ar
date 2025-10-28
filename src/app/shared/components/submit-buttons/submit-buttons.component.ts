import { Language } from './../../../core/enums/languages';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../services';

@Component({
  selector: 'app-submit-buttons',
  imports: [
    ToolbarModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TranslatePipe,
  ],
  templateUrl: './submit-buttons.component.html',
  styleUrls: ['./submit-buttons.component.scss'],
})
export class SubmitButtonsComponent implements OnInit {
  translationService = inject(TranslationService);
  currentLang = '';
  @Input() isSubmitDisabled: boolean = false;
  @Input() submitBtnLabel: string = 'ACTIONS.SUBMIT';
  @Output() submit = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @Input() viewCancelBtn: Boolean = true;

  onSubmit() {
    this.submit.emit();
  }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('currentLang') ?? '';
  }

  onCancel() {
    this.cancel.emit();
  }
}
