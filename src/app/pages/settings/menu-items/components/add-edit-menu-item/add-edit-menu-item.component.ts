import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItemsService, MenutypesService, PrimeAutoCompleteComponent, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-menu-item',
  imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, TranslatePipe],
  templateUrl: './add-edit-menu-item.component.html',
  styleUrl: './add-edit-menu-item.component.css'
})
//
export class AddEditMenuItemComponent extends BaseEditComponent implements OnInit {
  selectedMenuType: any;
  selectedParentMenuItem: any;
  selectedMenuItems: any;
  filteredMenuTypes: any[] = [];
  filteredMenuItems: any[] = [];

  menuItemsService: MenuItemsService = inject(MenuItemsService);
  menutypesService: MenutypesService = inject(MenutypesService);

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
      this.getEditMenuItem();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      target: ['', Validators.required],
      fragment: [''],
      icon: [''],
      order: [0, Validators.required],
      menuTypeId: ['', Validators.required],
      parentId: ['']
    });
  }

  getMenuTypes(event: any) {
    const query = event.query.toLowerCase();
    this.menutypesService.menuTypes.subscribe({
      next: (res: any) => {
        this.filteredMenuTypes = res.filter((mType: any) => mType.type.includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب انواع القوائم');
      }
    });
  }

  onMenuTypeSelect(event: any) {
    this.selectedMenuType = event.value;
    this.form.get('menuTypeId')?.setValue(this.selectedMenuType.id);
  }

  fetchMenuTypeDetails(menuItem: any) {
    this.menutypesService.menuTypes.subscribe((response: any) => {
      this.filteredMenuTypes = Array.isArray(response) ? response : response.data || [];
      this.selectedMenuType = this.filteredMenuTypes.find((mType: any) => mType.id === menuItem.menuTypeId);
      this.form.get('menuTypeId')?.setValue(this.selectedMenuType.id);
    });
  }

  getMenuItems(event: any) {
    const query = event.query.toLowerCase();
    this.menuItemsService.menuItems.subscribe({
      next: (res: any) => {
        this.filteredMenuItems = res.filter((mItems: any) => mItems.title.includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب عناصر القوائم الرئيسية');
      }
    });
  }

  onMenuItemSelect(event: any) {
    this.selectedMenuItems = event.value;
    this.form.get('parentId')?.setValue(this.selectedMenuItems.id);
  }

  fetchMenuItemDetails(menuItems: any) {
    this.menuItemsService.menuItems.subscribe((response: any) => {
      this.filteredMenuItems = Array.isArray(response) ? response : response.data || [];
      this.selectedMenuItems = this.filteredMenuItems.find((mItems: any) => mItems.id === menuItems.parentId);
      if (this.selectedMenuItems) {
        this.selectedParentMenuItem = this.selectedParentMenuItem;
        this.form.get('parentId')?.setValue(this.selectedParentMenuItem.id);
      }
    });
  }

  getEditMenuItem = () => {
    this.menuItemsService.getEditMenuItem(this.id()).subscribe((menuItems: any) => {
      this.initFormGroup();
      this.form.patchValue(menuItems);
      this.fetchMenuTypeDetails(menuItems);
      this.fetchMenuItemDetails(menuItems);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.menuItemsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.menuItemsService.update({ id: this.id(), ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
