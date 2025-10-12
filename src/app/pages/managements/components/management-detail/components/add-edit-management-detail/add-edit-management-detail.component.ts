import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ManagementDetailsService as ManageDetailsService,
  ManagementsService,
  PrimeAutoCompleteComponent,
  PrimeInputTextComponent,
  SubmitButtonsComponent,
} from '../../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-action',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeAutoCompleteComponent,
  ],
  templateUrl: './add-edit-management-detail.component.html',
  styleUrl: './add-edit-management-detail.component.css',
})
//
export class AddEditManagementDetailComponent
  extends BaseEditComponent
  implements OnInit
{
  selectedManagement: any;
  filteredManagements: any[] = [];

  manageDetailsService: ManageDetailsService = inject(ManageDetailsService);
  managementsService: ManagementsService = inject(ManagementsService);

  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;
      if (this.pageType === 'edit') {
        this.id = element.instance.ddconfig.data.row.rowData.id;
      }
    });
    if (this.pageType === 'edit') {
      this.getEditManagementDetail();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      managementId: [null, Validators.required],
    });
  }

  getManagements(event: any) {
    const query = event.query.toLowerCase();
    this.managementsService.managements.subscribe({
      next: (res: any) => {
        console.log(res);

        this.filteredManagements = res.filter((management: any) =>
          management.pageId.includes(query)
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

  fetchManagementDetails(managementDetail: any) {
    this.managementsService.managements.subscribe((response: any) => {
      this.filteredManagements = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedManagement = this.filteredManagements.find(
        (management: any) => management.id === managementDetail.id
      );
      this.form.get('managementId')?.setValue(this.selectedManagement.id);
    });
  }

  getEditManagementDetail = () => {
    this.manageDetailsService
      .getEditManagementDetail(this.id)
      .subscribe((manageDetail: any) => {
        this.initFormGroup();
        this.form.patchValue(manageDetail);
        this.fetchManagementDetails(manageDetail);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.manageDetailsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.manageDetailsService
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
