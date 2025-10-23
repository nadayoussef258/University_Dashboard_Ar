import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AboutService,
  PagesService,
  PrimeAutoCompleteComponent,
  PrimeInputTextComponent,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { SectorIdService } from '../../sector-id.service';
import { SectorsService } from '../../../../shared';

@Component({
  selector: 'app-add-edit-sector',
  imports: [
    CardModule,
    FormsModule,
    TabsModule,
    ReactiveFormsModule,
    PrimeAutoCompleteComponent,
    PrimeInputTextComponent,
    SubmitButtonsComponent,
  ],
  templateUrl: './add-edit-sector.component.html',
  styleUrl: './add-edit-sector.component.css',
})
//
export class AddEditSectorComponent
  extends BaseEditComponent
  implements OnInit
{
  sectorId: string = '';

  selectedPage: any;
  selectedAbout: any;
  filteredPages: any[] = [];
  filteredAbout: any[] = [];

  sectorsService: SectorsService = inject(SectorsService);
  pagesService: PagesService = inject(PagesService);
  aboutService: AboutService = inject(AboutService);
  sectorIdServices = inject(SectorIdService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.id.set(this.activatedRoute?.snapshot?.paramMap?.get('id') as string);

    // set value of sectorId
    this.sectorIdServices.setSectorId(this.id());

    if (this.pageType === 'edit') {
      this.getEditSector();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      subTitle: [null, Validators.required],
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
    console.log('onPageSelect selectedPage', this.selectedPage);

    this.form.get('pageId')?.setValue(this.selectedPage.id);
  }

  fetchPagesDetails(sector: any) {
    this.pagesService.pages.subscribe((response: any) => {
      this.filteredPages = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedPage = this.filteredPages.find(
        (page: any) => page.id === sector.pageId,
      );
      console.log('fetchPagesDetails this.filteredPages', this.filteredPages);
      console.log('fetchPagesDetails selectedPage', this.selectedPage);

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

  fetchAboutDetails(sector: any) {
    this.aboutService.abouts.subscribe((response: any) => {
      this.filteredAbout = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedAbout = this.filteredAbout.find(
        (about: any) => about.id === sector.aboutId,
      );
      this.form.get('aboutId')?.setValue(this.selectedAbout.id);
    });
  }

  getEditSector = () => {
    this.sectorsService.getEditSector(this.id()).subscribe((sector: any) => {
      this.initFormGroup();
      this.form.patchValue(sector);
      this.fetchPagesDetails(sector);
      this.fetchAboutDetails(sector);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.sectorsService.add(this.form.value).subscribe((res: any) => {
        this.redirect();
      });
    if (this.pageType === 'edit')
      this.sectorsService
        .update({ id: this.id(), ...this.form.value })
        .subscribe(() => {
          this.redirect();
        });
  }

  override redirect = () => {
    super.redirect('/pages/sectors');
  };
}
