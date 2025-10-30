import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeAutoCompleteComponent, PrimeInputTextComponent, SubmitButtonsComponent, UnitDetailsService, UnitsService } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { UnitIdService } from '../../unit-id.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-unit-detail',
  imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, TranslatePipe],
  templateUrl: './add-edit-unit-detail.component.html',
  styleUrl: './add-edit-unit-detail.component.css'
})
//
export class AddEditUnitDetailComponent extends BaseEditComponent implements OnInit {
  unitId: string = '';
  selectedUnit: any;
  filteredUnits: any[] = [];

  unitDetailsService: UnitDetailsService = inject(UnitDetailsService);
  unitsService: UnitsService = inject(UnitsService);
  dialogService: DialogService = inject(DialogService);
  unitIdService: UnitIdService = inject(UnitIdService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.unitId = this.unitIdService.UnitId();
    this.id.set(this.activatedRoute.snapshot.paramMap.get('id') as string);

    if (this.pageType === 'edit') {
      this.getEditUnitDetail();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      unitPlace: ['', Validators.required],
      unitId: [this.unitId, Validators.required]
    });
  }

  getUnits(event: any) {
    const query = event.query.toLowerCase();
    this.unitsService.units.subscribe({
      next: (res: any) => {
        this.filteredUnits = res.filter((unit: any) => unit.page.title.toLowerCase.includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب الادارات');
      }
    });
  }

  onUnitSelect(event: any) {
    this.selectedUnit = event.value;
    this.form.get('unitId')?.setValue(this.selectedUnit.id);
  }

  fetchUnitDetails(unitDetail: any) {
    this.unitsService.units.subscribe((response: any) => {
      this.filteredUnits = Array.isArray(response) ? response : response.data || [];
      this.selectedUnit = this.selectedUnit.find((unit: any) => unit.id === unitDetail.unitId);
      this.form.get('unitId')?.setValue(this.selectedUnit.id);
    });
  }

  getEditUnitDetail = () => {
    this.unitDetailsService.getEditUnitDetail(this.id()).subscribe((unitDetail: any) => {
      this.initFormGroup();
      this.form.patchValue(unitDetail);
      this.fetchUnitDetails(unitDetail);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.unitDetailsService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit') {
      this.unitDetailsService
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
    if (this.unitId) {
      super.redirect(`/pages/units/edit/${this.unitId}`);
    } else {
      super.redirect('/pages/unit-details');
    }
  };
}
