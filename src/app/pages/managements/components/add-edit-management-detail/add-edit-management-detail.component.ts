import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ManagementDetailsService as ManageDetailsService,
  ManagementsService,
  PrimeAutoCompleteComponent,
  PrimeInputTextComponent,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  selector: 'app-add-edit-management-detail',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeAutoCompleteComponent,
    ToggleSwitch,
  ],
  templateUrl: './add-edit-management-detail.component.html',
  styleUrl: './add-edit-management-detail.component.css',
})
//
export class AddEditManagementDetailComponent
  extends BaseEditComponent
  implements OnInit
{
  managementId: string = '';
  selectedManagement: any;
  filteredManagements: any[] = [];
  allowEditManagement: boolean = false;

  manageDetailsService: ManageDetailsService = inject(ManageDetailsService);
  managementsService: ManagementsService = inject(ManagementsService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
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
      managementId: [this.managementId, Validators.required],
    });
  }

  getManagements(event: any) {
    const query = event.query.toLowerCase();
    this.managementsService.managements.subscribe({
      next: (res: any) => {
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
        (management: any) => management.id === managementDetail.managementId
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

  // toggle to edit management
  toggleManagementEdit() {
    const control = this.form.get('managementId');

    if (this.allowEditManagement) {
      control?.enable({ emitEvent: false });
    } else {
      control?.disable({ emitEvent: false });
    }
  }

  submit() {
    if (this.pageType === 'add')
      this.manageDetailsService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit') {
      this.manageDetailsService
        .update({
          id: this.id,
          ...this.form.value,
        })
        .subscribe(() => {
          this.redirect();
        });
    }
  }

  override redirect = () => {
    super.redirect('/pages/management-details');
  };
}
