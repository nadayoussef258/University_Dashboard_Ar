import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CentersService } from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class CenterResolver implements Resolve<any> {
  constructor(private centersService: CentersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');

    return this.centersService.getCenter(id!).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          this.router.navigate(['/notfound-404']);
          return null;
        }
      }),
      catchError(() => {
        this.router.navigate(['/notfound-404']);
        return of(null);
      })
    );
  }
}
