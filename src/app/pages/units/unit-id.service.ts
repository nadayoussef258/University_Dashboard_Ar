import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitIdService {
  private selectedUnitIdSignal = signal<string>(''); // initial value

  // Getter كـ Signal للربط في المكونات
  UnitId = this.selectedUnitIdSignal.asReadonly();

  // Setter لتغيير القيمة
  setUnitId(unitId: string): void {
    this.selectedUnitIdSignal.set(unitId);
  }
}
