import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AboutService,
  PagesService,
  PrimeAutoCompleteComponent,
  SubmitButtonsComponent,
  UnitsService,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { UnitDetailsComponent } from '../unit-detail/unit-details.component';
import { UnitMembersComponent } from '../unit-member/unit-members.component';
import { UnitIdService } from '../../unit-id.service';

@Component({
  selector: 'app-add-edit-main-unit',
  imports: [
    CardModule,
    FormsModule,
    TabsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeAutoCompleteComponent,
    UnitDetailsComponent,
    UnitMembersComponent,
  ],
  templateUrl: './add-edit-main-unit.component.html',
  styleUrls: ['./add-edit-main-unit.component.css'],
})
//
export class AddEditUnitComponent extends BaseEditComponent implements OnInit {
  unitId: string = '';
  showUnitsTabs: boolean = false;

  selectedPage: any;
  selectedAbout: any;
  filteredPages: any[] = [];
  filteredAbout: any[] = [];

  unitsService: UnitsService = inject(UnitsService);
  pagesService: PagesService = inject(PagesService);
  aboutService: AboutService = inject(AboutService);
  unitIdServices = inject(UnitIdService);

  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.id = this.activatedRoute?.snapshot?.paramMap?.get('id') as string;
    this.unitId = this.activatedRoute?.snapshot?.paramMap?.get('id') as string;

    // set value of unitId
    this.unitIdServices.setUnitId(this.id);

    if (this.pageType === 'edit') {
      this.getEditUnit();
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
          page.title.toLowerCase().includes(query)
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
        (page: any) => page.id === management.pageId
      );
      this.form.get('pageId')?.setValue(this.selectedPage.id);
    });
  }

  getAbouts(event: any) {
    const query = event.query.toLowerCase();
    this.aboutService.abouts.subscribe({
      next: (res: any) => {
        this.filteredAbout = res.filter((about: any) =>
          about.content.toLowerCase().includes(query)
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

  fetchAboutDetails(unit: any) {
    this.aboutService.abouts.subscribe((response: any) => {
      this.filteredAbout = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedAbout = this.filteredAbout.find(
        (about: any) => about.id === unit.aboutId
      );
      this.form.get('aboutId')?.setValue(this.selectedAbout.id);
    });
  }

  getEditUnit = () => {
    this.unitsService.getEditUnit(this.id).subscribe((unit: any) => {
      this.initFormGroup();
      this.form.patchValue(unit);
      this.fetchPagesDetails(unit);
      this.fetchAboutDetails(unit);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.unitsService.add(this.form.value).subscribe((res: any) => {
        this.showUnitsTabs = true;
        this.redirect();
      });
    if (this.pageType === 'edit')
      this.unitsService
        .update({ id: this.id, ...this.form.value })
        .subscribe(() => {
          this.redirect();
        });
  }

  override redirect = () => {
    super.redirect('/pages/units');
  };
}
