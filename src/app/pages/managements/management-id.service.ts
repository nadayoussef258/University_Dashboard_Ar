import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagementIdService {
  private selectedManagementIdSignal = signal<string>(''); // initial value

  // Getter كـ Signal للربط في المكونات
  ManagementId = this.selectedManagementIdSignal.asReadonly();

  // Setter لتغيير القيمة
  setManagementId(city: string) {
    this.selectedManagementIdSignal.set(city);
  }
}
