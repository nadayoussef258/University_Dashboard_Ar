import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core';
import { EnumDto } from '../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DealerTypesService extends HttpService {
  protected get baseUrlV1(): string {
    return 'v1/dealertypes/';
  }

  protected get baseUrlV2(): string {
    return 'v2/dealertypes/';
  }

  get dealerTypes() {
    return this.get<EnumDto[]>({ apiName: 'getAll' });
  }
}
