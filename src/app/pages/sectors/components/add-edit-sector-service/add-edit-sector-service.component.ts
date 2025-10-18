import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimeAutoCompleteComponent,
  PrimeCheckBoxComponent,
  PrimeInputTextComponent,
  SectorDetailsService,
  SectorServicesService,
  SectorsService,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { SectorIdService } from '../../sector-id.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-edit-sector-service',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeAutoCompleteComponent,
    PrimeCheckBoxComponent,
    ToggleSwitch,
    NgClass,
  ],
  templateUrl: './add-edit-sector-service.component.html',
  styleUrl: './add-edit-sector-service.component.css',
})
//
export class AddEditSectorServiceComponent
  extends BaseEditComponent
  implements OnInit
{
  sectorId: string = '';
  selectedSector: any;
  filteredSectors: any[] = [];

  sectorServicesService: SectorServicesService = inject(SectorServicesService);
  sectorIdService: SectorIdService = inject(SectorIdService);
  sectorsService: SectorsService = inject(SectorsService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.sectorId = this.sectorIdService.SectortId();
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.pageType === 'edit') {
      this.getEditSectorDetail();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      duration: [''],
      applicationUrl: [''],
      downloadUrl: [''],
      isOnline: [false],
      category: [''],
      fees: [0],
      contactPerson: [''],
      contactPhone: [''],
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
        this.alert.error('خطأ فى جلب بيانات الفطاعات');
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

  getEditSectorDetail = () => {
    this.sectorServicesService
      .getEditSectorService(this.id)
      .subscribe((sectorDetail: any) => {
        this.initFormGroup();
        this.form.patchValue(sectorDetail);
        this.fetchSectorDetails(sectorDetail);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.sectorServicesService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit') {
      this.sectorServicesService
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
    if (this.sectorId) {
      super.redirect(`/pages/sectors/edit/${this.sectorId}`);
    } else {
      super.redirect('/pages/sector-services');
    }
  };
}
