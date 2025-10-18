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
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { NgClass } from '@angular/common';
import { ManagmentIdService } from '../../managment-id.service';
import { filter } from 'rxjs';

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
  allowEditManagement: boolean = false;
  hideToggleBtn: boolean = false;

  managementMembersService: ManagementMembersService = inject(
    ManagementMembersService
  );
  managementsService: ManagementsService = inject(ManagementsService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
    console.log(activatedRoute.url);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // ✅ تشغيل الكود عند أول تحميل للكومبوننت
    this.updateToggleVisibility(this.router.url);
    // ✅ تشغيل الكود عند أي تنقل داخل التطبيق
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateToggleVisibility(event.urlAfterRedirects);
      });

    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;
      this.managementId = element.instance.ddconfig.data.row.managementId;
      if (this.pageType === 'edit') {
        this.id = element.instance.ddconfig.data.row.rowData.id;
      }
    });
    if (this.pageType === 'edit') {
      this.getEditManagementMember();
    } else {
      this.initFormGroup();
    }
  }

  private updateToggleVisibility(url: string): void {
    const cleanUrl = url.split('?')[0];
    this.hideToggleBtn = cleanUrl.startsWith('/pages/managements/edit/');
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

  getEditManagementMember = () => {
    this.managementMembersService
      .getManagementMember(this.id)
      .subscribe((managementMember: any) => {
        this.initFormGroup();
        this.form.patchValue(managementMember);
        this.fetchManagementDetails(managementMember);
      });
  };

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
      this.managementMembersService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.managementMembersService
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
