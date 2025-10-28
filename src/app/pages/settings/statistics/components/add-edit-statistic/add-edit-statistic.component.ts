import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimeInputTextComponent,
  StatisticsService,
  SubmitButtonsComponent,
} from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TranslatePipe } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-edit-statistic',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    ToggleSwitchModule,
    NgClass,
    TranslatePipe,
  ],
  templateUrl: './add-edit-statistic.component.html',
  styleUrl: './add-edit-statistic.component.css',
})
export class AddEditStatisticComponent
  extends BaseEditComponent
  implements OnInit
{
  statisticsService: StatisticsService = inject(StatisticsService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;
      if (this.pageType === 'edit') {
        this.id.set(element.instance.ddconfig.data.row.rowData.id);
      }
    });

    if (this.pageType === 'edit') {
      this.getEditStatistics();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      value: ['', Validators.required],
      iconPath: ['', Validators.required],
      isActive: [false],
    });
  }

  getEditStatistics = () => {
    this.statisticsService
      .getEditStatistic(this.id())
      .subscribe((page: any) => {
        this.initFormGroup();
        this.form.patchValue(page);
      });
  };

  submit() {
    if (this.pageType === 'add') {
      this.statisticsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    }

    if (this.pageType === 'edit') {
      this.statisticsService
        .update({ id: this.id(), ...this.form.value })
        .subscribe(() => {
          this.closeDialog();
        });
    }
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
