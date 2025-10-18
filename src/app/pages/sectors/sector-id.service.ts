import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SectorIdService {
  private selectedSectorIdSignal = signal<string>('');

  SectortId = this.selectedSectorIdSignal.asReadonly();

  setSectorId(sector: string) {
    this.selectedSectorIdSignal.set(sector);
  }
}
