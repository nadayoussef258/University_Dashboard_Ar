import { ManagementAttachmentService } from './../../../../../../shared/services/pages/management/management-attachment/management-attachment.service';
import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CenterAttachmentsService,
  SubmitButtonsComponent,
} from '../../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-center-attachment',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
  ],
  templateUrl: './add-edit-center-attachment.component.html',
  styleUrl: './add-edit-center-attachment.component.css',
})
//
export class AddEditCenterAttachmentComponent
  extends BaseEditComponent
  implements OnInit
{
  centerAttachmentsService: CenterAttachmentsService = inject(
    CenterAttachmentsService,
  );
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
      this.getEditCenterAttachment();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      code: ['', Validators.required],
      nameAr: ['', Validators.required],
    });
  }

  getEditCenterAttachment = () => {
    this.centerAttachmentsService
      .getEditCenterAttachment(this.id())
      .subscribe((centerAttachment: any) => {
        this.initFormGroup();
        this.form.patchValue(centerAttachment);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.centerAttachmentsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.centerAttachmentsService
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
