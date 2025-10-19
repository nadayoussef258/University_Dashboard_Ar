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
import { SectorIdService } from '../../sector-id.service';

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

  sectorMembersService: SectorMembersService = inject(SectorMembersService);
  sectorsService: SectorsService = inject(SectorsService);
  sectorIdService: SectorIdService = inject(SectorIdService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.sectorId = this.sectorIdService.SectortId();

    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;
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
