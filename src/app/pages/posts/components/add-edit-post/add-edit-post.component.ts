import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PostsService,
  PrimeInputTextComponent,
  PrimeRadioButtonComponent,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-add-edit-post',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeRadioButtonComponent,
    ToggleSwitchModule,
  ],
  templateUrl: './add-edit-post.component.html',
  styleUrl: './add-edit-post.component.css',
})
//
export class AddEditPostComponent extends BaseEditComponent implements OnInit {
  selectedStatus: any;
  filteredStatus: any[] = [];

  postsService: PostsService = inject(PostsService);
  dialogService: DialogService = inject(DialogService);

  statusOptions = [
    { id: 1, nameAr: 'مسودة', nameEn: 'Draft' },
    { id: 2, nameAr: 'منشورة', nameEn: 'Published' },
    { id: 3, nameAr: 'مؤرشفة', nameEn: 'Archived' },
  ];

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;
      if (this.pageType === 'edit') {
        this.id = element.instance.ddconfig.data.row.rowData.id;
      }
    });
    if (this.pageType === 'edit') {
      this.getEditPost();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: ['Draft', Validators.required],
      isPublished: [false],
      publishedDate: [new Date()],
      featuredImageId: [],
      pageAttachments: [[]],
      postCategories: [[]],
      sectorPosts: [[]],
    });
  }

  // getStatus() {
  //       this.statusService.dealerTypes.subscribe({
  //           next: (res) => {
  //               this.dealerTypes = res;
  //               console.log('  this.dealerTypes', this.dealerTypes);
  //           },
  //           error: (err) => {
  //               this.alert.error(this.localize.translate.instant('خطأ في جلب البيانات'));
  //           }
  //       });
  //   }

  fetchStatusDetails(page: any) {
    this.selectedStatus = this.statusOptions.find(
      (stauts: any) => stauts.nameEn === page.status,
    );
    this.form.get('stauts')?.setValue(this.selectedStatus?.nameEn);
  }

  getEditPost = () => {
    this.postsService.getEditPost(this.id()).subscribe((post: any) => {
      this.initFormGroup();
      this.form.patchValue(post);
      this.fetchStatusDetails(post);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.postsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.postsService
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
