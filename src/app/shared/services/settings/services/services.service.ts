import { Injectable } from '@angular/core';
import { GetPagedBody } from '../../../interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends HttpService {
  protected get baseUrl(): string {
    return 'v2/services/';
  }

  getService(id: string) {
    return this.get<any>({ apiName: `Get/${id}` });
  }

  getEditService(id: string) {
    return this.get<any>({ apiName: `getedit/${id}` });
  }

  get services() {
    return this.get<any[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>(
      { apiName: `getdropdown`, showAlert: true },
      body
    );
  }

  add(body: any) {
    return this.post<any, any>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: any) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
