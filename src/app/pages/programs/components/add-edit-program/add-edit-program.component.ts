import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AboutService,
  PagesService,
  PrimeAutoCompleteComponent,
  ProgramsService,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ProgramIdService } from '../../program-id.service';

@Component({
  selector: 'app-add-edit-program',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeAutoCompleteComponent,
  ],
  templateUrl: './add-edit-program.component.html',
  styleUrl: './add-edit-program.component.css',
})
//
export class AddEditProgramComponent
  extends BaseEditComponent
  implements OnInit
{
  centerId: string = '';

  selectedPage: any;
  selectedAbout: any;
  filteredPages: any[] = [];
  filteredAbout: any[] = [];

  programsService: ProgramsService = inject(ProgramsService);
  pagesService: PagesService = inject(PagesService);
  aboutService: AboutService = inject(AboutService);
  programIdService: ProgramIdService = inject(ProgramIdService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.id.set(this.activatedRoute?.snapshot?.paramMap?.get('id') as string);
    this.programIdService.setProgramId(this.id());

    if (this.pageType === 'edit') {
      this.getEditProgram();
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

  fetchPagesDetails(program: any) {
    this.pagesService.pages.subscribe((response: any) => {
      this.filteredPages = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedPage = this.filteredPages.find(
        (page: any) => page.id === program.pageId,
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

  fetchAboutDetails(program: any) {
    this.aboutService.abouts.subscribe((response: any) => {
      this.filteredAbout = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedAbout = this.filteredAbout.find(
        (about: any) => about.id === program.aboutId,
      );
      this.form.get('aboutId')?.setValue(this.selectedAbout.id);
    });
  }

  getEditProgram = () => {
    this.programsService.getEditProgram(this.id()).subscribe((program: any) => {
      console.log(
        `program from getEditProgram AddEditProgramComponent`,
        program,
      );

      this.initFormGroup();
      this.form.patchValue(program);
      this.fetchPagesDetails(program);
      this.fetchAboutDetails(program);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.programsService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit')
      this.programsService
        .update({ id: this.id(), ...this.form.value })
        .subscribe(() => {
          this.redirect();
        });
  }

  override redirect = () => {
    super.redirect('/pages/programs');
  };
}
