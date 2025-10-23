import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CenterMembersService,
  ManagementMembersService as ManageMembersService,
  MembersService,
  PagesService,
  PrimeAutoCompleteComponent,
  PrimeInputTextComponent,
  ProgramMembersService,
  SectorMembersService,
  SubmitButtonsComponent,
  UnitMembersService,
} from '../../../../shared';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { NgClass } from '@angular/common';
import { MemberIdService } from '../../member-id.service';
@Component({
  selector: 'app-add-edit-member',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    ToggleSwitch,
    PrimeAutoCompleteComponent,
    NgClass,
  ],
  templateUrl: './add-edit-member.component.html',
  styleUrl: './add-edit-member.component.css',
})
//
export class AddEditMemberComponent
  extends BaseEditComponent
  implements OnInit
{
  memberId: string = '';

  selectedPage: any;
  selectedSectorMember: any;
  selectedProgramMember: any;
  selectedManagementMember: any;
  selectedCenterMember: any;
  selectedUnitMember: any;
  filteredPages: any[] = [];
  filteredSectorMembers: any[] = [];
  filteredProgramMembers: any[] = [];
  filteredManagementMembers: any[] = [];
  filteredCenterMembers: any[] = [];
  filteredUnitMembers: any[] = [];

  membersService: MembersService = inject(MembersService);
  memberIdService: MemberIdService = inject(MemberIdService);
  pagesService: PagesService = inject(PagesService);
  sectorMembersService: SectorMembersService = inject(SectorMembersService);
  programMembersService: ProgramMembersService = inject(ProgramMembersService);
  managementMembersService: ManageMembersService = inject(ManageMembersService);
  centerMembersService: CenterMembersService = inject(CenterMembersService);
  unitMembersService: UnitMembersService = inject(UnitMembersService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.id.set(this.activatedRoute?.snapshot?.paramMap?.get('id') as string);
    // set value of sectorId
    this.memberIdService.setMemberId(this.id());

    if (this.pageType === 'edit') {
      this.getEditMember();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      isPresident: [false],
      fullName: ['', Validators.required],
      position: ['', Validators.required],
      specialization: ['', Validators.required],
      pageId: ['', Validators.required],
      sectorMemberId: ['', Validators.required],
      programMemberId: ['', Validators.required],
      managementMemberId: ['', Validators.required],
      centerMemberId: ['', Validators.required],
      unitMemberId: ['', Validators.required],
      memberAttachments: [null],
    });
  }

  // Pages autocomplete
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

  fetchPagesDetails(member: any) {
    this.pagesService.pages.subscribe((response: any) => {
      this.filteredPages = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedPage = this.filteredPages.find(
        (page: any) => page.id === member.pageId,
      );
      this.form.get('pageId')?.setValue(this.selectedPage.id);
    });
  }

  // SectorMembers autocomplete
  getSectorMembers(event: any) {
    const query = event.query.toLowerCase();
    this.sectorMembersService.sectorMembers.subscribe({
      next: (res: any) => {
        console.log('sectors ::: ', res);

        this.filteredSectorMembers = res.filter((sectorMember: any) =>
          sectorMember.id.toLowerCase().includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات القطاعات');
      },
    });
  }

  onSectorMemberSelect(event: any) {
    this.selectedSectorMember = event.value;
    this.form.get('sectorMemberId')?.setValue(this.selectedSectorMember.id);
  }

  fetchSectorMemberDetails(member: any) {
    this.sectorMembersService.sectorMembers.subscribe((response: any) => {
      this.filteredSectorMembers = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedSectorMember = this.filteredSectorMembers.find(
        (sectorMember: any) => sectorMember.id === member.sectorMemberId,
      );
      this.form.get('sectorMemberId')?.setValue(this.selectedSectorMember.id);
    });
  }

  // ProgramMembers autocomplete
  getProgramMembers(event: any) {
    const query = event.query.toLowerCase();
    this.programMembersService.programMembers.subscribe({
      next: (res: any) => {
        this.filteredProgramMembers = res.filter((programMember: any) =>
          programMember.id.toLowerCase().includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات البرامج');
      },
    });
  }

  onProgramMemberSelect(event: any) {
    this.selectedProgramMember = event.value;
    this.form.get('progamMemberId')?.setValue(this.selectedProgramMember.id);
  }

  fetchProgramMemberDetails(member: any) {
    this.programMembersService.programMembers.subscribe((response: any) => {
      this.filteredProgramMembers = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedProgramMember = this.filteredProgramMembers.find(
        (programMember: any) => programMember.id === member.progamMemberId,
      );
      this.form.get('progamMemberId')?.setValue(this.selectedProgramMember.id);
    });
  }

  // ManagementMembers autocomplete
  getManagementMembers(event: any) {
    const query = event.query.toLowerCase();
    this.managementMembersService.managementMembers.subscribe({
      next: (res: any) => {
        this.filteredManagementMembers = res.filter((managementMember: any) =>
          managementMember.id.toLowerCase().includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات الإدارات');
      },
    });
  }

  onManagementMemberSelect(event: any) {
    this.selectedManagementMember = event.value;
    this.form
      .get('managementMemberId')
      ?.setValue(this.selectedManagementMember.id);
  }

  fetchManagementMemberDetails(member: any) {
    this.managementMembersService.managementMembers.subscribe(
      (response: any) => {
        this.filteredManagementMembers = Array.isArray(response)
          ? response
          : response.data || [];
        this.selectedManagementMember = this.filteredManagementMembers.find(
          (managementMember: any) =>
            managementMember.id === member.managementMemberId,
        );
        this.form
          .get('managementMemberId')
          ?.setValue(this.selectedManagementMember.id);
      },
    );
  }

  // CenterMembers autocomplete
  getCenterMembers(event: any) {
    const query = event.query.toLowerCase();
    this.centerMembersService.centerMembers.subscribe({
      next: (res: any) => {
        this.filteredCenterMembers = res.filter((centerMember: any) =>
          centerMember.id.toLowerCase().includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات المراكز');
      },
    });
  }

  onCenterMemberSelect(event: any) {
    this.selectedCenterMember = event.value;
    this.form.get('centerMemberId')?.setValue(this.selectedCenterMember.id);
  }

  fetchCenterMemberDetails(member: any) {
    this.centerMembersService.centerMembers.subscribe((response: any) => {
      this.filteredCenterMembers = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedCenterMember = this.filteredCenterMembers.find(
        (centerMember: any) => centerMember.id === member.centerMemberId,
      );
      this.form.get('centerMemberId')?.setValue(this.selectedCenterMember.id);
    });
  }

  // UnitMembers autocomplete
  getUnitMembers(event: any) {
    const query = event.query.toLowerCase();
    this.unitMembersService.unitMembers.subscribe({
      next: (res: any) => {
        this.filteredUnitMembers = res.filter((unitMember: any) =>
          unitMember.id.toLowerCase().includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات الوحدات');
      },
    });
  }

  onUnitMemberSelect(event: any) {
    this.selectedUnitMember = event.value;
    this.form.get('unitMemberId')?.setValue(this.selectedUnitMember.id);
  }

  fetchUnitMemberDetails(member: any) {
    this.unitMembersService.unitMembers.subscribe((response: any) => {
      this.filteredUnitMembers = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedUnitMember = this.filteredUnitMembers.find(
        (unitMember: any) => unitMember.id === member.unitMemberId,
      );
      this.form.get('unitMemberId')?.setValue(this.selectedUnitMember.id);
    });
  }

  getEditMember = () => {
    this.membersService.getEditMember(this.id()).subscribe((member: any) => {
      this.initFormGroup();
      this.form.patchValue(member);
      this.fetchPagesDetails(member);
      this.fetchSectorMemberDetails(member);
      this.fetchProgramMemberDetails(member);
      this.fetchManagementMemberDetails(member);
      this.fetchCenterMemberDetails(member);
      this.fetchCenterMemberDetails(member);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.membersService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit')
      this.membersService
        .update({ id: this.id(), ...this.form.value })
        .subscribe(() => {
          this.redirect();
        });
  }

  override redirect = () => {
    super.redirect('/pages/members');
  };
}
