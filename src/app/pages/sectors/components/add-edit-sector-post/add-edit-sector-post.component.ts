import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PostsService,
  PrimeAutoCompleteComponent,
  SectorPostsService,
  SectorsService,
  SubmitButtonsComponent,
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { filter } from 'rxjs';

@Component({
  selector: 'app-add-edit-sector-post',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeAutoCompleteComponent,
    ToggleSwitch,
    ToggleSwitch,
  ],
  templateUrl: './add-edit-sector-post.component.html',
  styleUrl: './add-edit-sector-post.component.css',
})
//
export class AddEditSectorPostComponent
  extends BaseEditComponent
  implements OnInit
{
  sectorId: string = '';
  selectedPost: any;
  filteredPosts: any[] = [];
  selectedSector: any;
  filteredSectors: any[] = [];
  allowEditSector: boolean = false;
  hideToggleBtn: boolean = false;

  sectorPostsService: SectorPostsService = inject(SectorPostsService);
  sectorsService: SectorsService = inject(SectorsService);
  postsService: PostsService = inject(PostsService);
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
      this.getEditSectorsPost();
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
      postId: ['', Validators.required],
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

  fetchSectorDetails(sectorPost: any) {
    this.sectorsService.sectors.subscribe((response: any) => {
      this.filteredSectors = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedSector = this.filteredSectors.find(
        (sector: any) => sector.id === sectorPost.sectorId
      );
      this.form.get('sectorId')?.setValue(this.selectedSector.id);
    });
  }

  getPosts(event: any) {
    const query = event.query.toLowerCase();
    this.postsService.posts.subscribe({
      next: (res: any) => {
        this.filteredPosts = res.filter((post: any) =>
          post.title.includes(query)
        );
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب المنشورات');
      },
    });
  }

  onPostSelect(event: any) {
    this.selectedPost = event.value;
    this.form.get('postId')?.setValue(this.selectedPost.id);
  }

  fetchPostDetails(sectorPost: any) {
    this.postsService.posts.subscribe((response: any) => {
      this.filteredSectors = Array.isArray(response)
        ? response
        : response.data || [];
      this.selectedPost = this.filteredPosts.find(
        (post: any) => post.id === sectorPost.postId
      );
      this.form.get('postId')?.setValue(this.selectedPost.id);
    });
  }

  getEditSectorsPost = () => {
    this.sectorPostsService
      .getEditSectorPost(this.id)
      .subscribe((sectorPost: any) => {
        this.initFormGroup();
        this.form.patchValue(sectorPost);
        this.fetchSectorDetails(sectorPost);
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
      this.sectorPostsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.sectorPostsService
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
