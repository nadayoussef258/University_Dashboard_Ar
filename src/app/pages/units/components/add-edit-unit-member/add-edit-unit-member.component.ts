import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimeAutoCompleteComponent,
  SubmitButtonsComponent,
  UnitMembersService,
  UnitsService,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { NgClass } from '@angular/common';
import { UnitIdService } from '../../unit-id.service';

@Component({
  selector: 'app-add-edit-unit-member',
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
  templateUrl: './add-edit-unit-member.component.html',
  styleUrl: './add-edit-unit-member.component.css',
})
//
export class AddEditUnitMemberComponent
  extends BaseEditComponent
  implements OnInit
{
  unitId: string = '';
  selectedUnit: any;
  filteredUnits: any[] = [];

  unitMembersService: UnitMembersService = inject(UnitMembersService);
  unitsService: UnitsService = inject(UnitsService);
  unitIdService: UnitIdService = inject(UnitIdService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
    console.log(activatedRoute.url);
  }

  override ngOnInit(): void {
    // super.ngOnInit();
    this.unitId = this.unitIdService.UnitId();
    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;
      console.log(this.unitId, 'unitId');

      if (this.pageType === 'edit') {
        this.id = element.instance.ddconfig.data.row.rowData.id;
      }
    });
    if (this.pageType === 'edit') {
      this.getEditUnitMember();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      isLeader: [false],
      unitId: [this.unitId, Validators.required],
    });
  }

  getUnits(event: any) {
    const query = event.query.toLowerCase();
    this.unitsService.units.subscribe({
      next: (res: any) => {
        this.filteredUnits = res.filter((unit: any) =>
          unit.pageId.includes(query)
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب الادارات');
      },
    });
  }

  onUnitSelect(event: any) {
    this.selectedUnit = event.value;
    this.form.get('unitId')?.setValue(this.selectedUnit.id);
  }

  fetchUnitDetails(unitMember: any) {
    this.unitsService.units.subscribe((response: any) => {
      this.filteredUnits = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedUnit = this.selectedUnit.find(
        (unit: any) => unit.id === unitMember.unitId
      );
      this.form.get('unitId')?.setValue(this.selectedUnit.id);
    });
  }

  getEditUnitMember = () => {
    this.unitMembersService
      .getEditUnitMember(this.id)
      .subscribe((unitMember: any) => {
        this.initFormGroup();
        this.form.patchValue(unitMember);
        this.fetchUnitDetails(unitMember);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.unitMembersService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.unitMembersService
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
