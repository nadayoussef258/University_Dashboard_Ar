import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgramIdService {
  private selectedProgramIdSignal = signal<string>('');

  ProgramId = this.selectedProgramIdSignal.asReadonly();

  setProgramId(programId: string) {
    this.selectedProgramIdSignal.set(programId);
  }
}
