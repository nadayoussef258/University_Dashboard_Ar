import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagmentIdService {
  private selectedManagmentIdSignal = signal<string>(''); // initial value

  // Getter كـ Signal للربط في المكونات
  ManagmentId = this.selectedManagmentIdSignal.asReadonly();

  // Setter لتغيير القيمة
  setManagementId(city: string) {
    this.selectedManagmentIdSignal.set(city);
  }
}
