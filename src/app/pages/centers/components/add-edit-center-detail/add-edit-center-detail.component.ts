import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CenterDetailsService,
  CentersService,
  PrimeAutoCompleteComponent,
  PrimeInputTextComponent,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { CenterIdService } from '../../center-id.service';

@Component({
  selector: 'app-add-edit-center-detail',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeAutoCompleteComponent,
  ],
  templateUrl: './add-edit-center-detail.component.html',
  styleUrl: './add-edit-center-detail.component.css',
})
//
export class AddEditCenterDetailComponent
  extends BaseEditComponent
  implements OnInit
{
  centerId: string = '';
  selectedCenter: any;
  filteredCenters: any[] = [];

  centerDetailsService: CenterDetailsService = inject(CenterDetailsService);
  centersService: CentersService = inject(CentersService);
  centerIdService: CenterIdService = inject(CenterIdService);

  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    // super.ngOnInit();
    this.centerId = this.centerIdService.CenterId();
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.pageType === 'edit') {
      this.getEditCenterDetail();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      centerId: [null, Validators.required],
    });
  }

  getCenters(event: any) {
    const query = event.query.toLowerCase();
    this.centersService.centers.subscribe({
      next: (res: any) => {
        this.filteredCenters = res.filter((center: any) =>
          center.pageId.includes(query)
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب المراكز');
      },
    });
  }

  onCenterSelect(event: any) {
    this.selectedCenter = event.value;
    this.form.get('centerId')?.setValue(this.selectedCenter.id);
  }

  fetchCenterDetails(centerDetail: any) {
    this.centersService.centers.subscribe((response: any) => {
      this.filteredCenters = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedCenter = this.filteredCenters.find(
        (center: any) => center.id === centerDetail.id
      );
      this.form.get('centerId')?.setValue(this.selectedCenter.id);
    });
  }

  getEditCenterDetail = () => {
    this.centerDetailsService
      .getEditCenterDetail(this.id)
      .subscribe((centerDetail: any) => {
        this.initFormGroup();
        this.form.patchValue(centerDetail);
        this.fetchCenterDetails(centerDetail);
      });
  };

  submit() {
    if (this.pageType === 'add')
      this.centerDetailsService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit')
      this.centerDetailsService
        .update({ id: this.id, ...this.form.value })
        .subscribe(() => {
          this.redirect();
        });
  }

  override redirect = () => {
    if (this.centerId) {
      super.redirect(`/pages/centers/edit/${this.centerId}`);
    } else {
      super.redirect('/pages/center-details');
    }
  };
}
