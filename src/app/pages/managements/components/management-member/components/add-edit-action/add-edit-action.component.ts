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
  selector: 'app-add-edit-action',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
  ],
  templateUrl: './add-edit-action.component.html',
  styleUrl: './add-edit-action.component.css',
})
//
export class AddEditActionComponent
  extends BaseEditComponent
  implements OnInit
{
  actionsService: ActionsService = inject(ActionsService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
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
      this.getEditAction();
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

  getEditAction = () => {
    this.actionsService.getEditAction(this.id).subscribe((page: any) => {
      this.initFormGroup();
      this.form.patchValue(page);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.actionsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.actionsService
        .update({ id: this.id, ...this.form.value })
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
