import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-prime-file-upload',

  imports: [CommonModule, ReactiveFormsModule, FileUpload, ButtonModule, BadgeModule, ProgressBarModule, ToastModule],
  templateUrl: './p-file-upload.component.html',
  styleUrls: ['./p-file-upload.component.scss'],
  providers: [MessageService]
})
export class PrimeFileUploadComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() label = '';
  @Input() multiple = false;
  @Input() uploadUrl = 'https://www.primefaces.org/cdn/api/upload.php';

  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    if (!this.formGroup.get(this.controlName)) {
      throw new Error(`Control '${this.controlName}' not found in FormGroup`);
    }
  }

  onSelect(event: FileSelectEvent) {
    const files = event.currentFiles;

    const newAttachments = files.map((file) => {
      const extension = file.name.split('.').pop() || '';
      return {
        fileName: file.name,
        extension,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        isPublic: true,
        attachmentDisplaySize: this.formatSize(file.size),
        url: '', // بيتحدّث بعد الرفع من الباك
        fileObject: file // مؤقتًا نحتفظ بالأوبجكت لو حبيت ترفعه فعليًا بعدين
      };
    });

    this.uploadedFiles = [...this.uploadedFiles, ...newAttachments];
    this.formGroup.patchValue({
      [this.controlName]: this.uploadedFiles
    });
  }

  onRemove(file: any, index: number) {
    this.uploadedFiles.splice(index, 1);
    this.formGroup.patchValue({
      [this.controlName]: this.uploadedFiles
    });
  }

  onUpload() {
    this.messageService.add({
      severity: 'success',
      summary: 'Uploaded',
      detail: 'Files uploaded successfully!'
    });
  }

  formatSize(bytes: number) {
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
