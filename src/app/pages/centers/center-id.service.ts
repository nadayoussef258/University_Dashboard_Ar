import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CenterIdService {
  private selectedCenterIdSignal = signal<string>('');

  CenterId = this.selectedCenterIdSignal.asReadonly();

  setCenterId(centerId: string) {
    this.selectedCenterIdSignal.set(centerId);
  }
}
