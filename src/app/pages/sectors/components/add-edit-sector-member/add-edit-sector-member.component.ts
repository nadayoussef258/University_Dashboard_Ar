import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimeAutoCompleteComponent,
  SectorMembersService,
  SectorsService,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-add-edit-sector-member',
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
  templateUrl: './add-edit-sector-member.component.html',
  styleUrl: './add-edit-sector-member.component.css',
})
//
export class AddEditSectorMemberComponent
  extends BaseEditComponent
  implements OnInit
{
  sectorId: string = '';
  selectedSector: any;
  filteredSectors: any[] = [];
  allowEditSector: boolean = false;
  hideToggleBtn: boolean = false;

  sectorMembersService: SectorMembersService = inject(SectorMembersService);
  sectorsService: SectorsService = inject(SectorsService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
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
      this.sectorId = element.instance.ddconfig.data.row.sectorId;
      if (this.pageType === 'edit') {
        this.id = element.instance.ddconfig.data.row.rowData.id;
      }
    });
    if (this.pageType === 'edit') {
      this.getEditSectorsMember();
    } else {
      this.initFormGroup();
    }
  }

  private updateToggleVisibility(url: string): void {
    const cleanUrl = url.split('?')[0];
    this.hideToggleBtn = cleanUrl.startsWith('/pages/sectors/edit/');
  }

  initFormGroup() {
    this.form = this.fb.group({
      isLeader: [false],
      sectorId: [this.sectorId, Validators.required],
    });
  }

  getSectors(event: any) {
    const query = event.query.toLowerCase();
    this.sectorsService.sectors.subscribe({
      next: (res: any) => {
        this.filteredSectors = res.filter((sector: any) =>
          sector.name.includes(query)
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب القطاعات');
      },
    });
  }

  onSectorSelect(event: any) {
    this.selectedSector = event.value;
    this.form.get('sectorId')?.setValue(this.selectedSector.id);
  }

  fetchSectorDetails(sectorDetail: any) {
    this.sectorsService.sectors.subscribe((response: any) => {
      this.filteredSectors = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedSector = this.filteredSectors.find(
        (sector: any) => sector.id === sectorDetail.sectorId
      );
      this.form.get('sectorId')?.setValue(this.selectedSector.id);
    });
  }

  getEditSectorsMember = () => {
    this.sectorMembersService
      .getEditSectorMember(this.id)
      .subscribe((sectorMember: any) => {
        this.initFormGroup();
        this.form.patchValue(sectorMember);
        this.fetchSectorDetails(sectorMember);
      });
  };

  toggleSectorEdit() {
    const control = this.form.get('sectorId');
    if (this.allowEditSector) {
      control?.enable({ emitEvent: false });
    } else {
      control?.disable({ emitEvent: false });
    }
  }

  submit() {
    if (this.pageType === 'add')
      this.sectorMembersService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.sectorMembersService
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
