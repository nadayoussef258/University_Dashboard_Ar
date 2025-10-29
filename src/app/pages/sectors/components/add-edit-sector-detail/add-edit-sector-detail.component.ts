import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimeAutoCompleteComponent,
  PrimeInputTextComponent,
  SectorDetailsService,
  SectorsService,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { SectorIdService } from '../../sector-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-sector-detail',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeAutoCompleteComponent,
    TranslatePipe,
  ],
  templateUrl: './add-edit-sector-detail.component.html',
  styleUrl: './add-edit-sector-detail.component.css',
})
//
export class AddEditSectorDetailComponent
  extends BaseEditComponent
  implements OnInit
{
  sectorId: string = '';
  selectedSector: any;
  filteredSectors: any[] = [];

  sectorDetailsService: SectorDetailsService = inject(SectorDetailsService);
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
      this.getEditSectorDetail();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      sectorId: [this.sectorId, Validators.required],
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
        this.alert.error('خطأ فى جلب الادارات');
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
        (sector: any) => sector.id === sectorDetail.sectorId,
      );
      this.form.get('sectorId')?.setValue(this.selectedSector.id);
    });
  }

  getEditSectorDetail = () => {
    this.sectorDetailsService
      .getEditSectorDetail(this.id())
      .subscribe((sectorDetail: any) => {
        this.initFormGroup();
        this.form.patchValue(sectorDetail);
        this.fetchSectorDetails(sectorDetail);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.sectorDetailsService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit') {
      this.sectorDetailsService
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
      super.redirect('/pages/sector-details');
    }
  };
}
