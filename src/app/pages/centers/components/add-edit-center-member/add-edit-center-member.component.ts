import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CenterMembersService,
  CentersService,
  PrimeAutoCompleteComponent,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { NgClass } from '@angular/common';
import { CenterIdService } from '../../center-id.service';

@Component({
  selector: 'app-add-edit-center-member',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeAutoCompleteComponent,
    ToggleSwitch,
    NgClass,
  ],
  templateUrl: './add-edit-center-member.component.html',
  styleUrl: './add-edit-center-member.component.css',
})
//
export class AddEditCenterMemberComponent
  extends BaseEditComponent
  implements OnInit
{
  centerId: string = '';
  selectedCenter: any;
  filteredCenters: any[] = [];

  centerMembersService: CenterMembersService = inject(CenterMembersService);
  centersService: CentersService = inject(CentersService);
  centerIdService: CenterIdService = inject(CenterIdService);

  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.centerId = this.centerIdService.CenterId();

    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;

      if (this.pageType === 'edit') {
        this.id.set(element.instance.ddconfig.data.row.rowData.id);
      }
    });
    if (this.pageType === 'edit') {
      this.getEditCenterMember();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      isLeader: [false],
      centerId: [this.centerId, Validators.required],
    });
  }

  getCenters(event: any) {
    const query = event.query.toLowerCase();
    this.centersService.centers.subscribe({
      next: (res: any) => {
        this.filteredCenters = res.filter((center: any) =>
          center.centerId.includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب المراكز');
      },
    });
  }

  onCenterSelect(event: any) {
    this.selectedCenter = event.value;
    this.form.get('centerId')?.setValue(this.selectedCenter.id);
  }

  fetchCenterDetails(centerDetail: any) {
    this.centersService.centers.subscribe((response: any) => {
      this.filteredCenters = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedCenter = this.filteredCenters.find(
        (center: any) => center.id === centerDetail.id,
      );
      this.form.get('centerId')?.setValue(this.selectedCenter.id);
    });
  }

  getEditCenterMember = () => {
    this.centerMembersService
      .getEditCenterMember(this.id())
      .subscribe((centerMember: any) => {
        this.initFormGroup();
        this.form.patchValue(centerMember);
        this.fetchCenterDetails(centerMember);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.centerMembersService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.centerMembersService
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
