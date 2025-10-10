import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimeInputTextComponent,
  ServicesService,
  SubmitButtonsComponent,
} from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-add-edit-service',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    ToggleSwitchModule,
  ],
  templateUrl: './add-edit-service.component.html',
  styleUrl: './add-edit-service.component.css',
})
//
export class AddEditServiceComponent
  extends BaseEditComponent
  implements OnInit
{
  servicesService: ServicesService = inject(ServicesService);
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
      this.getEditService();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      iconPath: ['', Validators.required],
      isActive: ['', Validators.required],
    });
  }

  getEditService = () => {
    this.servicesService.getEditService(this.id).subscribe((page: any) => {
      this.initFormGroup();
      this.form.patchValue(page);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.servicesService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.servicesService
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
