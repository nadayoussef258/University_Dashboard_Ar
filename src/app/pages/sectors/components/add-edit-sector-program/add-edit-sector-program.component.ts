import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PrimeAutoCompleteComponent,
  PrimeInputTextComponent,
  SectorProgramsService,
  SectorsService,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { filter } from 'rxjs';

@Component({
  selector: 'app-add-edit-sector-program',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeAutoCompleteComponent,
    PrimeInputTextComponent,
    ToggleSwitch,
    ToggleSwitch,
  ],
  templateUrl: './add-edit-sector-program.component.html',
  styleUrl: './add-edit-sector-program.component.css',
})
// post => add =>status 400 bad request
export class AddEditSectorProgramComponent
  extends BaseEditComponent
  implements OnInit
{
  sectorId: string = '';
  selectedSector: any;
  filteredSectors: any[] = [];
  allowEditSector: boolean = false;
  hideToggleBtn: boolean = false;

  sectorProgramsService: SectorProgramsService = inject(SectorProgramsService);
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
      this.getEditSectorsProgram();
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
      name: ['', Validators.required],
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
        this.alert.error('خطأ فى جلب بيانات القطاعات');
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

  getEditSectorsProgram = () => {
    this.sectorProgramsService
      .getEditSectorProgram(this.id)
      .subscribe((sectorProgram: any) => {
        this.initFormGroup();
        this.form.patchValue(sectorProgram);
        this.fetchSectorDetails(sectorProgram);
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
      this.sectorProgramsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.sectorProgramsService
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
