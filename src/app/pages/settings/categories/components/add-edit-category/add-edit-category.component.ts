import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-category',
  imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
  templateUrl: './add-edit-category.component.html',
  styleUrl: './add-edit-category.component.css'
})
//
export class AddEditCategoryComponent extends BaseEditComponent implements OnInit {
  categoriesService: CategoriesService = inject(CategoriesService);
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
      this.getEditCategory();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  getEditCategory = () => {
    this.categoriesService.getCategory(this.id()).subscribe((page: any) => {
      this.initFormGroup();
      this.form.patchValue(page);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.categoriesService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.categoriesService.update({ id: this.id(), ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
