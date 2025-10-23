import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent } from '../../../../../../shared';
import { BaseEditComponent } from '../../../../../../base/components/base-edit-component';
import { ManagementAttachmentService } from './../../../../../../shared';

@Component({
  selector: 'app-add-edit-management-attachment',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
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
        this.id.set(element.instance.ddconfig.data.row.rowData.id);
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
