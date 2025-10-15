import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
  selector: 'app-prime-radio-button',
  imports: [RadioButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './p-radio-button.component.html',
  styleUrl: './p-radio-button.component.scss',
})
export class PrimeRadioButtonComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() value: any = '';
  @Input() groupName = '';
  @Input() label: any = '';

  //? 🔹 Smart disabled setter:
  // بدلاً من تمرير [disabled] مباشرةً إلى الـ <p-radioButton> (الذي يُسبب تحذيرًا في Reactive Forms)،
  // هذا الـ setter يتحكم في حالة الـ FormControl نفسها من خلال formGroup.
  // عندما يستقبل قيمة true → يتم تعطيل الـ FormControl بطريقة Angular الصحيحة (control.disable()).
  // عندما يستقبل قيمة false → يتم تفعيل الـ FormControl (control.enable()).
  // emitEvent: false يُستخدم لتجنّب إطلاق أحداث إضافية أثناء التبديل.
  @Input() set disabled(value: boolean) {
    const control = this.formGroup?.get(this.controlName);
    if (control) {
      value
        ? control.disable({ emitEvent: false })
        : control.enable({ emitEvent: false });
    }
  }
  @Input() binary?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
