import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from './alert.service'; // Import the alert service

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: any) => {
        if ((event?.body)) {
          this.alertService.success('Operation completed successfully.');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.alertService.error(error.error.message || 'An error occurred. Please try again.');
        return throwError(error);
      })
    );
  }
}
