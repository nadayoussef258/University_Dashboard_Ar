import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagementDetailsService as ManageDetailsService, ManagementsService, PrimeAutoCompleteComponent, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ManagementIdService } from '../../management-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-management-detail',
  imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, TranslatePipe],
  templateUrl: './add-edit-management-detail.component.html',
  styleUrl: './add-edit-management-detail.component.css'
})
//
export class AddEditManagementDetailComponent extends BaseEditComponent implements OnInit {
  managementId: string = '';
  selectedManagement: any;
  filteredManagements: any[] = [];

  manageDetailsService: ManageDetailsService = inject(ManageDetailsService);
  managementsService: ManagementsService = inject(ManagementsService);
  managementIdService: ManagementIdService = inject(ManagementIdService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.managementId = this.managementIdService.ManagementId();
    this.id.set(this.activatedRoute.snapshot.paramMap.get('id') as string);

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
      managementId: [this.managementId, Validators.required]
    });
  }

  getManagements(event: any) {
    const query = event.query.toLowerCase();
    this.managementsService.managements.subscribe({
      next: (res: any) => {
        this.filteredManagements = res.filter((management: any) => management.pageId.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب الادارات');
      }
    });
  }

  onManagementSelect(event: any) {
    this.selectedManagement = event.value;
    this.form.get('managementId')?.setValue(this.selectedManagement.id);
  }

  fetchManagementDetails(managementDetail: any) {
    this.managementsService.managements.subscribe((response: any) => {
      this.filteredManagements = Array.isArray(response) ? response : response.data || [];
      this.selectedManagement = this.filteredManagements.find((management: any) => management.id === managementDetail.managementId);
      this.form.get('managementId')?.setValue(this.selectedManagement.id);
    });
  }

  getEditManagementDetail = () => {
    this.manageDetailsService.getEditManagementDetail(this.id()).subscribe((manageDetail: any) => {
      this.initFormGroup();
      this.form.patchValue(manageDetail);
      this.fetchManagementDetails(manageDetail);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.manageDetailsService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit') {
      this.manageDetailsService
        .update({
          id: this.id(),
          ...this.form.value
        })
        .subscribe(() => {
          this.redirect();
        });
    }
  }

  override redirect = () => {
    if (this.managementId) {
      super.redirect(`/pages/managements/edit/${this.managementId}`);
    } else {
      super.redirect('/pages/management-details');
    }
  };
}
