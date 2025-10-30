import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionsService, MenutypesService, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-menu-type',
  imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
  templateUrl: './add-edit-menu-type.component.html',
  styleUrl: './add-edit-menu-type.component.css'
})
//
export class AddEditMenuTypeComponent extends BaseEditComponent implements OnInit {
  menutypesService: MenutypesService = inject(MenutypesService);
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
      this.getEditMenuType();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      type: ['', Validators.required]
    });
  }

  getEditMenuType = () => {
    this.menutypesService.getEditMenuType(this.id()).subscribe((page: any) => {
      this.initFormGroup();
      this.form.patchValue(page);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.menutypesService.add(this.form.value).subscribe(() => {
        this.alert.success('تم الاصافة بنجاح ');
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.menutypesService.update({ id: this.id(), ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
