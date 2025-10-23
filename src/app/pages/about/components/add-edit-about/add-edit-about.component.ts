import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AboutService,
  PagesService,
  PrimeAutoCompleteComponent,
  PrimeDropDownComponent,
  PrimeInputTextComponent,
  PrimeRadioButtonComponent,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-add-edit-about',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    ToggleSwitchModule,
    PrimeAutoCompleteComponent,
  ],
  templateUrl: './add-edit-about.component.html',
  styleUrl: './add-edit-about.component.css',
})
//
export class AddEditAboutComponent extends BaseEditComponent implements OnInit {
  selectedPage: any;
  filteredPages: any[] = [];

  aboutService: AboutService = inject(AboutService);
  pagesService: PagesService = inject(PagesService);
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
      this.getEditAbout();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      content: ['', Validators.required],
      mission: ['', Validators.required],
      vision: ['', Validators.required],
      history: ['', Validators.required],
      pageId: [null, Validators.required],
    });
  }

  getPages(event: any) {
    const query = event.query.toLowerCase();
    this.pagesService.pages.subscribe({
      next: (res: any) => {
        this.filteredPages = res.filter((page: any) =>
          page.title.toLowerCase().includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات الفروع');
      },
    });
  }

  onPageSelect(event: any) {
    this.selectedPage = event.value;
    this.form.get('pageId')?.setValue(this.selectedPage.id);
  }

  fetchPagesDetails(about: any) {
    this.pagesService.pages.subscribe((response: any) => {
      this.filteredPages = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedPage = this.filteredPages.find(
        (page: any) => page.id === about.pageId,
      );
      this.form.get('pageId')?.setValue(this.selectedPage.id);
    });
  }

  getEditAbout = () => {
    this.aboutService.getEditabout(this.id()).subscribe((about: any) => {
      this.initFormGroup();
      this.form.patchValue(about);
      this.fetchPagesDetails(about);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.aboutService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.aboutService
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
