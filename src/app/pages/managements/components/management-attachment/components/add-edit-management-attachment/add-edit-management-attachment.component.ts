import { ManagementAttachmentService } from './../../../../../../shared/services/pages/management/management-attachment/management-attachment.service';
import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ActionsService,
  PrimeInputTextComponent,
  SubmitButtonsComponent,
} from '../../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-management-attachment',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
  ],
  templateUrl: './add-edit-management-attachment.component.html',
  styleUrl: './add-edit-management-attachment.component.css',
})
//
export class AddEditManagementAttachmentComponent
  extends BaseEditComponent
  implements OnInit
{
  managementAttachmentService: ManagementAttachmentService = inject(
    ManagementAttachmentService,
  );
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  getAllManagementAttachments() {
    this.managementAttachmentService.managementAttachments.subscribe(
      (response: any) => {
        console.log('managementAttachments ::', response);
      },
    );
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;
      if (this.pageType === 'edit') {
        this.id = element.instance.ddconfig.data.row.rowData.id;
      }
    });
    if (this.pageType === 'edit') {
      this.getEditManagementAttachment();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      code: ['', Validators.required],
      nameAr: ['', Validators.required],
    });
    this.getAllManagementAttachments();
  }

  getEditManagementAttachment = () => {
    this.managementAttachmentService
      .getEditManagementAttachment(this.id())
      .subscribe((managementAttachment: any) => {
        this.initFormGroup();
        this.form.patchValue(managementAttachment);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.managementAttachmentService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.managementAttachmentService
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
