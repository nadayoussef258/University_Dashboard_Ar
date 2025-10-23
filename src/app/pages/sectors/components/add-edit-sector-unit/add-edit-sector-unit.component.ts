import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimeAutoCompleteComponent,
  PrimeInputTextComponent,
  SectorsService,
  SectorUnitsService,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { SectorIdService } from '../../sector-id.service';

@Component({
  selector: 'app-add-edit-sector-unit',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeAutoCompleteComponent,
  ],
  templateUrl: './add-edit-sector-unit.component.html',
  styleUrl: './add-edit-sector-unit.component.css',
})
//
export class AddEditSectorUnitComponent
  extends BaseEditComponent
  implements OnInit
{
  sectorId: string = '';
  selectedSector: any;
  filteredSectors: any[] = [];

  sectorUnitsService: SectorUnitsService = inject(SectorUnitsService);
  sectorIdService: SectorIdService = inject(SectorIdService);
  sectorsService: SectorsService = inject(SectorsService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.sectorId = this.sectorIdService.SectortId();
    this.id.set(this.activatedRoute.snapshot.paramMap.get('id') as string);

    if (this.pageType === 'edit') {
      this.getEditSectorUnit();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      unitNameAr: ['', Validators.required],
      unitDescriptionAr: ['', Validators.required],
      manager: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      employeesCount: [0, [Validators.required, Validators.min(0)]],
      location: [''],
      unitPhone: [''],
    });
  }

  getSectors(event: any) {
    const query = event.query.toLowerCase();
    this.sectorsService.sectors.subscribe({
      next: (res: any) => {
        this.filteredSectors = res.filter((sector: any) =>
          sector.name.includes(query),
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات القطاعات');
      },
    });
  }

  onSectorSelect(event: any) {
    this.selectedSector = event.value;
    this.form.get('sectorId')?.setValue(this.selectedSector.id);
  }

  fetchSectorUnitsDetails(sectorUnit: any) {
    this.sectorsService.sectors.subscribe((response: any) => {
      this.filteredSectors = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedSector = this.filteredSectors.find(
        (sector: any) => sector.id === sectorUnit.sectorId,
      );
      this.form.get('sectorId')?.setValue(this.selectedSector.id);
    });
  }

  getEditSectorUnit = () => {
    this.sectorUnitsService
      .getEditSectorUnit(this.id())
      .subscribe((sectorUnit: any) => {
        this.initFormGroup();
        this.form.patchValue(sectorUnit);
        this.fetchSectorUnitsDetails(sectorUnit);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.sectorUnitsService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit') {
      this.sectorUnitsService
        .update({
          id: this.id(),
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
      super.redirect('/pages/sector-units');
    }
  };
}
