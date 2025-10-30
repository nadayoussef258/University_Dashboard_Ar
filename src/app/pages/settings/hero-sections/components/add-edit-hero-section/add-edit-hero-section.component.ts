import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroSectionsService, PrimeFileUploadComponent, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-add-edit-hero-section',
  imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeFileUploadComponent, ToggleSwitchModule],
  templateUrl: './add-edit-hero-section.component.html',
  styleUrl: './add-edit-hero-section.component.css'
})
export class AddEditHeroSectionComponent extends BaseEditComponent implements OnInit {
  heroSectionsService = inject(HeroSectionsService);
  dialogService = inject(DialogService);

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
      this.getEditHeroSection();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [false],
      heroAttachments: [[], Validators.required] // ✅ مصفوفة فارغة
    });
  }

  getEditHeroSection = () => {
    this.heroSectionsService.getEditHeroSection(this.id()).subscribe((hero: any) => {
      this.initFormGroup();
      this.form.patchValue(hero);
    });
  };

  submit() {
    if (this.pageType === 'add') {
      this.heroSectionsService.add(this.form.value).subscribe(() => this.closeDialog());
    } else if (this.pageType === 'edit') {
      this.heroSectionsService.update({ id: this.id(), ...this.form.value }).subscribe(() => this.closeDialog());
    }
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => dialog.destroy());
  }
}
