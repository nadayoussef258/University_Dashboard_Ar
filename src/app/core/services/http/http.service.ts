import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TranslationService } from '../../../shared';
import { NamedHttpStatus } from '../../enums/named-http-status';
import { ConfigService } from '../config/config.service';
import { AlertService } from '../alert/alert.service';
import { ApResponse } from '../../interface/response/response';
import { HttpServiceBaseService } from './HttpServiceBase.service';
import { UrlConfig } from '../../interface/http/UrlConfig';
import { NumberedHttpStatus } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpService extends HttpServiceBaseService {
  protected domainName: string;
  alertService = inject(AlertService);
  configService = inject(ConfigService);
  localize = inject(TranslationService);
  constructor(protected http: HttpClient) {
    super();
    this.domainName = this.configService.getAppUrl('HOST_API');
  }

  get<T>(URL_Config: UrlConfig): Observable<T> {
    return this.http
      .get<
        ApResponse<T>
      >(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, { params: URL_Config.params })
      .pipe(
        map((event) => {
          return event.data;
        }),
      );
  }

  getAll<T>(URL_Config: UrlConfig): Observable<T[]> {
    return this.http
      .get<
        ApResponse<T[]>
      >(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, { params: URL_Config.params })
      .pipe(
        map((event) => {
          return event.data;
        }),
      );
  }

  postFilter<T, D>(URL_Config: UrlConfig, body: T): Observable<D> {
    return this.http
      .post<
        ApResponse<D>
      >(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params })
      .pipe(
        map((event) => {
          URL_Config.showAlert ? this.alertHandling(event) : '';
          return event.data;
        }),
      );
  }

  post<T, D>(URL_Config: UrlConfig, body: T): Observable<D> {
    return this.http
      .post<
        ApResponse<D>
      >(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params })
      .pipe(
        map((event) => {
          console.log('eventttt :::: ', event);

          this.alertHandling(event);
          return event.data;
        }),
      );
  }

  postRange<T, D>(URL_Config: UrlConfig, body: T): Observable<D> {
    return this.http
      .post<
        ApResponse<D>
      >(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params })
      .pipe(
        map((event) => {
          URL_Config.showAlert ? this.alertHandling(event) : '';
          return event.data;
        }),
      );
  }

  put<T, D>(URL_Config: UrlConfig, body: T): Observable<D> {
    return this.http
      .put<
        ApResponse<D>
      >(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params })
      .pipe(
        map((event: any) => {
          this.alertHandling(event);
          return event.data;
        }),
        catchError((error) => {
          if (error.error) {
            this.alertHandling(error.error);
          } else {
            this.alertHandling(error);
          }
          // مهم: نرجّع الخطأ علشان اللي استدعى الميثود يعرف يتعامل معاه لو حابب
          return throwError(() => error);
        }),
      );
  }

  delete(URL_Config: UrlConfig, id: any): Observable<boolean> {
    return this.http
      .delete<
        ApResponse<boolean>
      >(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, { body: id, params: URL_Config.params })
      .pipe(
        map((event: any) => {
          this.alertHandling(event);
          return event.data;
        }),
      );
  }

  dropdownPost<T, D>(URL_Config: UrlConfig, body: T): Observable<any> {
    return this.http
      .post<
        ApResponse<D>
      >(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params })
      .pipe(
        map((event) => {
          URL_Config.showAlert ? this.alertHandling(event) : '';
          return event;
        }),
      );
  }

  dropdownExternalPost<T, D>(URL_Config: UrlConfig, body: T): Observable<any> {
    return this.http
      .post<
        ApResponse<D>
      >(`${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params })
      .pipe(
        map((event) => {
          URL_Config.showAlert ? this.alertHandling(event) : '';
          return event;
        }),
      );
  }

  private alertHandling(event: ApResponse<any>) {
    console.log('event in alertHandling :::', event);

    if (event.statusCode) {
      const status = event.statusCode;
      console.log('event :::', event);
      console.log('event errors::::', event.errors);
      console.log('event.message ::::', event.message);

      // لو الكود بيبدأ بـ 2 => نجاح
      if (status.toString().startsWith('2') || event.message === 'success') {
        this.alertService.success(
          event.message
            ? this.localize.translate.instant('VALIDATION.' + event.message)
            : 'Successfully Done...',
        );
        return;
      }

      // حالات الأخطاء حسب statusCode
      switch (status) {
        case NumberedHttpStatus.BadRequest: {
          if (
            event.errors &&
            Array.isArray(event.errors) &&
            event.errors.length
          ) {
            const errorMessages = event.errors
              .map((error) =>
                this.localize.translate.instant('VALIDATION.' + event.message),
              )
              .join(', ');

            this.alertService.error(errorMessages);
          } else {
            this.alertService.error(
              event.message
                ? this.localize.translate.instant('VALIDATION.' + event.message)
                : '!NOT HANDLED ERROR!',
            );
          }
          break;
        }
        case NumberedHttpStatus.InternalServerError: {
          this.alertService.error(
            event.message
              ? this.localize.translate.instant('VALIDATION.' + event.message)
              : this.localize.translate.instant(
                  'VALIDATION.INTERNAL_SERVER_ERROR',
                ),
          );
          break;
        }
        case NumberedHttpStatus.BadGateway:
        case NumberedHttpStatus.NotFound: {
          this.alertService.error(
            event.message
              ? this.localize.translate.instant('VALIDATION.' + event.message)
              : '!NOT HANDLED ERROR!',
          );
          break;
        }
        default: {
          this.alertService.error(
            event.message
              ? this.localize.translate.instant('VALIDATION.' + event.message)
              : '!NOT HANDLED ERROR!',
          );
        }
      }
    } else {
      // لو مفيش statusCode
      this.alertService.error(
        event.message
          ? this.localize.translate.instant('VALIDATION.' + event.message)
          : '!NOT HANDLED ERROR!',
      );
    }
  }
}
