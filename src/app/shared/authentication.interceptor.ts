import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
import { SharedService } from './services/shared.service';
import { LoaderService } from './services/loader.service';
import { SpinnrService } from './services/spinnr.service';
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  token = '';

  constructor( private loader: LoaderService, private spinnerService: SpinnrService, private sharedService: SharedService ) {}

  intercept( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {

    this.spinnerService.show();
    const userData = JSON.parse(sessionStorage.getItem('userInfo') as string);
    let auth: any;
    if (userData) {
      this.token = userData.access_token;
    }
      auth = request.clone({
        headers: request.headers
          .set('Authorization-Token', `${this.token}`)
          // .set('Access-Control-Allow-Origin', 'true')
          .append('Accept', 'application/json'),
        responseType: 'json'
      });

    this.loader.show();
    return next.handle(auth).pipe(
      // tap((response) => {
      //   console.log(response)
      //   this.loader.hide();

      // }),
      finalize(() => {
        this.loader.hide();
        this.spinnerService.hide();
      }),
      catchError((error: HttpErrorResponse) => {
        this.loader.hide();
        if (error.status === 403) {
          // permission error
        }
        if (error.status === 401) {
          // this.sharedService.showMessage('UnAuthorized', 'error-snackbar');
        }
        return throwError(error);
      })
    );
  }
}
