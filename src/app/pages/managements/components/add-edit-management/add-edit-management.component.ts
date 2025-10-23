import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AboutService,
  ManagementsService,
  PagesService,
  PrimeAutoCompleteComponent,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { ManagmentIdService } from '../../managment-id.service';

@Component({
  selector: 'app-add-edit-management',
  imports: [
    CardModule,
    FormsModule,
    TabsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeAutoCompleteComponent,
  ],
  templateUrl: './add-edit-management.component.html',
  styleUrl: './add-edit-management.component.css',
})
//
export class AddEditManagementComponent
  extends BaseEditComponent
  implements OnInit
{
  managementId: string = '';

  selectedPage: any;
  selectedAbout: any;
  filteredPages: any[] = [];
  filteredAbout: any[] = [];

  managementsService: ManagementsService = inject(ManagementsService);
  pagesService: PagesService = inject(PagesService);
  aboutService: AboutService = inject(AboutService);
  managementIdServices = inject(ManagmentIdService);

  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.id.set(this.activatedRoute?.snapshot?.paramMap?.get('id') as string);

    // set value of managementId
    this.managementIdServices.setManagementId(this.id());

    if (this.pageType === 'edit') {
      this.getEditManagement();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      pageId: [null, Validators.required],
      aboutId: [null, Validators.required],
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
        this.alert.error('خطأ فى جلب بيانات الصفحات');
      },
    });
  }

  onPageSelect(event: any) {
    this.selectedPage = event.value;
    this.form.get('pageId')?.setValue(this.selectedPage.id);
  }

  fetchPagesDetails(management: any) {
    this.pagesService.pages.subscribe((response: any) => {
      this.filteredPages = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedPage = this.filteredPages.find(
        (page: any) => page.id === management.pageId,
      );
      this.form.get('pageId')?.setValue(this.selectedPage.id);
    });
  }

  getAbouts(event: any) {
    const query = event.query.toLowerCase();
    this.aboutService.abouts.subscribe({
      next: (res: any) => {
        this.filteredAbout = res.filter((about: any) =>
          about.content.toLowerCase().includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات عن الجامعة');
      },
    });
  }

  onAboutSelect(event: any) {
    this.selectedAbout = event.value;
    this.form.get('aboutId')?.setValue(this.selectedAbout.id);
  }

  fetchAboutDetails(management: any) {
    this.aboutService.abouts.subscribe((response: any) => {
      this.filteredAbout = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedAbout = this.filteredAbout.find(
        (about: any) => about.id === management.aboutId,
      );
      this.form.get('aboutId')?.setValue(this.selectedAbout.id);
    });
  }

  getEditManagement = () => {
    this.managementsService
      .getEditManagement(this.id())
      .subscribe((management: any) => {
        this.initFormGroup();
        this.form.patchValue(management);
        this.fetchPagesDetails(management);
        this.fetchAboutDetails(management);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.managementsService.add(this.form.value).subscribe((res: any) => {
        this.redirect();
      });
    if (this.pageType === 'edit')
      this.managementsService
        .update({ id: this.id(), ...this.form.value })
        .subscribe(() => {
          this.redirect();
        });
  }

  override redirect = () => {
    super.redirect('/pages/managements');
  };
}
