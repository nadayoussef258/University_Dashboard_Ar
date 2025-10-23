import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  LogosService,
  PrimeInputTextComponent,
  SubmitButtonsComponent,
} from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-logo',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
  ],
  templateUrl: './add-edit-logo.component.html',
  styleUrl: './add-edit-logo.component.css',
})
//
export class AddEditLogoComponent extends BaseEditComponent implements OnInit {
  //
  logosService: LogosService = inject(LogosService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;
      if (this.pageType === 'edit') {
        this.id.set(element.instance.ddconfig.data.row.rowData.id);
      }
    });
    if (this.pageType === 'edit') {
      this.getEditLogo();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      facebook: ['', Validators.required],
      twitter: ['', Validators.required],
      instagram: ['', Validators.required],
      linkedIn: ['', Validators.required],
      youTube: ['', Validators.required],
      whatsApp: ['', Validators.required],
      mapLocation: ['', Validators.required],
    });
  }

  getEditLogo = () => {
    this.logosService.getEditLogo(this.id()).subscribe((logo: any) => {
      this.initFormGroup();
      this.form.patchValue(logo);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.logosService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.logosService
        .update({ id: this.id(), ...this.form.value })
        .subscribe(() => {
          this.closeDialog();
        });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
