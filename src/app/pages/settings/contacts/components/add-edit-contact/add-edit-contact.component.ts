import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ContactsService,
  PrimeInputTextComponent,
  SubmitButtonsComponent,
} from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-action',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
  ],
  templateUrl: './add-edit-contact.component.html',
  styleUrl: './add-edit-contact.component.css',
})
//
export class AddEditContactComponent
  extends BaseEditComponent
  implements OnInit
{
  contactsService: ContactsService = inject(ContactsService);
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
      this.getEditContact();
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

  getEditContact = () => {
    this.contactsService.getEditContact(this.id()).subscribe((page: any) => {
      this.initFormGroup();
      this.form.patchValue(page);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.contactsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.contactsService
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
