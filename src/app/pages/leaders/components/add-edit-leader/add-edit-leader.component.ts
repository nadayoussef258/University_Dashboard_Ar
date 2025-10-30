import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AboutService, MembersService, PagesService, PrimeAutoCompleteComponent, PrimeDropDownComponent, PrimeInputTextComponent, PrimeRadioButtonComponent, SubmitButtonsComponent } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { LeadersService } from '../../../../shared/services/pages/leaders/leaders.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-leader',
  imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, ToggleSwitchModule, PrimeAutoCompleteComponent, TranslatePipe],
  templateUrl: './add-edit-leader.component.html',
  styleUrl: './add-edit-leader.component.css'
})
//
export class AddEditLeaderComponent extends BaseEditComponent implements OnInit {
  selectedMember: any;
  filteredMembers: any[] = [];

  leadersService: LeadersService = inject(LeadersService);
  membersService: MembersService = inject(MembersService);
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
      this.getEditMember();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      position: ['', Validators.required],
      memberId: ['', Validators.required],
      leaderAttachments: ['']
    });
  }

  getMembers(event: any) {
    const query = event.query.toLowerCase();
    this.leadersService.leaders.subscribe({
      next: (res: any) => {
        this.filteredMembers = res.filter((member: any) => member.fullName.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات الأعضاء');
      }
    });
  }

  onMemberSelect(event: any) {
    this.selectedMember = event.value;
    this.form.get('memberId')?.setValue(this.selectedMember.id);
  }

  fetchMembersDetails(leader: any) {
    this.membersService.members.subscribe((response: any) => {
      this.filteredMembers = Array.isArray(response) ? response : response.data || [];
      this.selectedMember = this.filteredMembers.find((member: any) => member.id === leader.memberId);
      this.form.get('memberId')?.setValue(this.selectedMember.id);
    });
  }

  getEditMember = () => {
    this.leadersService.getEditLeader(this.id()).subscribe((leader: any) => {
      this.initFormGroup();
      this.form.patchValue(leader);
      this.fetchMembersDetails(leader);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.leadersService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.leadersService.update({ id: this.id(), ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
