import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AboutService, ActionsService, CentersService, ManagementsService, PagesService, PrimeAutoCompleteComponent, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { CenterIdService } from '../../center-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-center',
  imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, TranslatePipe],
  templateUrl: './add-edit-center.component.html',
  styleUrl: './add-edit-center.component.css'
})
//
export class AddEditCenterComponent extends BaseEditComponent implements OnInit {
  centerId: string = '';

  selectedPage: any;
  selectedAbout: any;
  filteredPages: any[] = [];
  filteredAbout: any[] = [];

  centersService: CentersService = inject(CentersService);
  pagesService: PagesService = inject(PagesService);
  aboutService: AboutService = inject(AboutService);
  centerIdService: CenterIdService = inject(CenterIdService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.id.set(this.activatedRoute?.snapshot?.paramMap?.get('id') as string);
    // this.centerId = this.activatedRoute?.snapshot?.paramMap?.get('id') ?? '';

    this.centerIdService.setCenterId(this.id());

    if (this.pageType === 'edit') {
      this.getEditCenter();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      subTitle: ['', Validators.required],
      place: ['', Validators.required],
      pageId: [null, Validators.required],
      aboutId: [null, Validators.required]
    });
  }

  getPages(event: any) {
    const query = event.query.toLowerCase();
    this.pagesService.pages.subscribe({
      next: (res: any) => {
        this.filteredPages = res.filter((page: any) => page.title.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات الصفحات');
      }
    });
  }

  onPageSelect(event: any) {
    this.selectedPage = event.value;
    this.form.get('pageId')?.setValue(this.selectedPage.id);
  }

  fetchPagesDetails(management: any) {
    this.pagesService.pages.subscribe((response: any) => {
      this.filteredPages = Array.isArray(response) ? response : response.data || [];
      this.selectedPage = this.filteredPages.find((page: any) => page.id === management.pageId);
      this.form.get('pageId')?.setValue(this.selectedPage.id);
    });
  }

  getAbouts(event: any) {
    const query = event.query.toLowerCase();
    this.aboutService.abouts.subscribe({
      next: (res: any) => {
        this.filteredAbout = res.filter((about: any) => about.content.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات عن الجامعة');
      }
    });
  }

  onAboutSelect(event: any) {
    this.selectedAbout = event.value;
    this.form.get('aboutId')?.setValue(this.selectedAbout.id);
  }

  fetchAboutDetails(management: any) {
    this.aboutService.abouts.subscribe((response: any) => {
      this.filteredAbout = Array.isArray(response) ? response : response.data || [];
      this.selectedAbout = this.filteredAbout.find((about: any) => about.id === management.aboutId);
      this.form.get('aboutId')?.setValue(this.selectedAbout.id);
    });
  }

  getEditCenter = () => {
    this.centersService.getEditCenter(this.id()).subscribe((center: any) => {
      this.initFormGroup();
      this.form.patchValue(center);
      this.fetchPagesDetails(center);
      this.fetchAboutDetails(center);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.centersService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit')
      this.centersService.update({ id: this.id(), ...this.form.value }).subscribe(() => {
        this.redirect();
      });
  }

  override redirect = () => {
    super.redirect('/pages/centers');
  };
}
