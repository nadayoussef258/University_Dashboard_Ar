import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberIdService {
  private selectedMemberIdSignal = signal<string>('');

  MembertId = this.selectedMemberIdSignal.asReadonly();

  /**
   *
   * @param member  add member data
   */
  setMemberId(member: string) {
    this.selectedMemberIdSignal.set(member);
  }
}
