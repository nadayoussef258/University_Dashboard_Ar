import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimeAutoCompleteComponent,
  PrimeInputTextComponent,
  ProgramDetailsService,
  SubmitButtonsComponent,
  ProgramsService,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ProgramIdService } from '../../program-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-program-detail',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeAutoCompleteComponent,
    TranslatePipe,
  ],
  templateUrl: './add-edit-program-detail.component.html',
  styleUrl: './add-edit-program-detail.component.css',
})
//
export class AddEditProgramDetailComponent
  extends BaseEditComponent
  implements OnInit
{
  programId: string = '';
  selectedProgram: any;
  filteredPrograms: any[] = [];

  programDetailsService: ProgramDetailsService = inject(ProgramDetailsService);
  programsService: ProgramsService = inject(ProgramsService);
  programIdService: ProgramIdService = inject(ProgramIdService);

  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.programId = this.programIdService.ProgramId();
    this.id.set(this.activatedRoute.snapshot.paramMap.get('id') as string);

    if (this.pageType === 'edit') {
      this.getEditProgramDetail();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      programCategory: ['', Validators.required],
      facultyId: [''], //! what this ?????
      programId: [null, Validators.required],
      programAttachments: [''],
    });
  }

  getPrograms(event: any) {
    const query = event.query.toLowerCase();
    this.programsService.programs.subscribe({
      next: (res: any) => {
        this.filteredPrograms = res.filter((program: any) =>
          program.pageId.includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب البرامج');
      },
    });
  }

  onProgramSelect(event: any) {
    this.selectedProgram = event.value;
    this.form.get('programId')?.setValue(this.selectedProgram.id);
  }

  fetchProgramDetails(programDetail: any) {
    this.programsService.programs.subscribe((response: any) => {
      this.programsService = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedProgram = this.filteredPrograms.find(
        (program: any) => program.id === programDetail.id,
      );
      this.form.get('programId')?.setValue(this.selectedProgram.id);
    });
  }

  getEditProgramDetail = () => {
    this.programDetailsService
      .getEditProgramDetail(this.id())
      .subscribe((programDetail: any) => {
        this.initFormGroup();
        this.form.patchValue(programDetail);
        this.fetchProgramDetails(programDetail);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.programDetailsService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit')
      this.programDetailsService
        .update({ id: this.id(), ...this.form.value })
        .subscribe(() => {
          this.redirect();
        });
  }

  override redirect = () => {
    if (this.programId) {
      super.redirect(`/pages/programs/edit/${this.programId}`);
    } else {
      super.redirect('/pages/program-details');
    }
  };
}
