import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ManagementMembersService,
  ManagementsService,
  PrimeAutoCompleteComponent,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { NgClass } from '@angular/common';
import { ManagmentIdService } from '../../managment-id.service';

@Component({
  selector: 'app-add-edit-management-member',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeAutoCompleteComponent,
    ToggleSwitch,
    NgClass,
    ToggleSwitch,
  ],
  templateUrl: './add-edit-management-member.component.html',
  styleUrl: './add-edit-management-member.component.css',
})
//
export class AddEditManagementMemberComponent
  extends BaseEditComponent
  implements OnInit
{
  managementId: string = '';
  selectedManagement: any;
  filteredManagements: any[] = [];

  managementMembersService: ManagementMembersService = inject(
    ManagementMembersService,
  );
  managementsService: ManagementsService = inject(ManagementsService);
  managmentIdService: ManagmentIdService = inject(ManagmentIdService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
    console.log(activatedRoute.url);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.managementId = this.managmentIdService.ManagmentId();

    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;

      if (this.pageType === 'edit') {
        this.id.set(element.instance.ddconfig.data.row.rowData.id);
      }
    });

    if (this.pageType === 'edit') {
      this.getEditManagementMember();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      isLeader: [false],
      managementId: [this.managementId, Validators.required],
    });
  }

  getManagements(event: any) {
    const query = event.query.toLowerCase();
    this.managementsService.managements.subscribe({
      next: (res: any) => {
        this.filteredManagements = res.filter((management: any) =>
          management.pageId.includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب الادارات');
      },
    });
  }

  onManagementSelect(event: any) {
    this.selectedManagement = event.value;
    this.form.get('managementId')?.setValue(this.selectedManagement.id);
  }

  fetchManagementDetails(managementMember: any) {
    this.managementsService.managements.subscribe((response: any) => {
      this.filteredManagements = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedManagement = this.filteredManagements.find(
        (management: any) => management.id === managementMember.managementId,
      );
      this.form.get('managementId')?.setValue(this.selectedManagement.id);
    });
  }

  getEditManagementMember = () => {
    this.managementMembersService
      .getManagementMember(this.id())
      .subscribe((managementMember: any) => {
        this.initFormGroup();
        this.form.patchValue(managementMember);
        this.fetchManagementDetails(managementMember);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.managementMembersService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.managementMembersService
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
