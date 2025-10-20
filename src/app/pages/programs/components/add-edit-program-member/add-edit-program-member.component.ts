import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimeAutoCompleteComponent,
  ProgramMembersService,
  ProgramsService,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { NgClass } from '@angular/common';
import { ProgramIdService } from '../../program-id.service';

@Component({
  selector: 'app-add-edit-program-member',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeAutoCompleteComponent,
    ToggleSwitch,
    NgClass,
  ],
  templateUrl: './add-edit-program-member.component.html',
  styleUrl: './add-edit-program-member.component.css',
})
//
export class AddEditProgramMemberComponent
  extends BaseEditComponent
  implements OnInit
{
  programId: string = '';
  selectedProgram: any;
  filteredPrograms: any[] = [];

  programMembersService: ProgramMembersService = inject(ProgramMembersService);
  programsService: ProgramsService = inject(ProgramsService);
  programIdService: ProgramIdService = inject(ProgramIdService);

  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.programId = this.programIdService.ProgramId();

    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;

      if (this.pageType === 'edit') {
        this.id = element.instance.ddconfig.data.row.rowData.id;
      }
    });
    if (this.pageType === 'edit') {
      this.getEditProgramMember();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      isLeader: [false],
      centerId: [this.programId, Validators.required],
    });
  }

  getPrograms(event: any) {
    const query = event.query.toLowerCase();
    this.programsService.programs.subscribe({
      next: (res: any) => {
        this.filteredPrograms = res.filter((program: any) =>
          program.pageId.includes(query)
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

  fetchProgramDetails(programMember: any) {
    this.programsService.programs.subscribe((response: any) => {
      this.programsService = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedProgram = this.filteredPrograms.find(
        (program: any) => program.id === programMember.id
      );
      this.form.get('programId')?.setValue(this.selectedProgram.id);
    });
  }

  getEditProgramMember = () => {
    this.programMembersService
      .getEditProgramMember(this.id)
      .subscribe((programMember: any) => {
        this.initFormGroup();
        this.form.patchValue(programMember);
        this.fetchProgramDetails(programMember);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.programMembersService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.programMembersService
        .update({ id: this.id, ...this.form.value })
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
