import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (!token) {
      token = 'start';
    }

    if (!token && window.location.hash !== '#/auth/login') {
      window.location.href = '/#/auth/login';
    }

    const req = request.clone({
      setHeaders: {
        'Authorization': `Token ${token}`,
      },
    });

    return next.handle(req).pipe(catchError((error) => {
      this.handleAuthError(error);
      return of(error);
    }) as any);
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 || error.status === 403) {
      window.location.href = '/#/auth/login';
      return of(error.message);
    }
    throw error;
  }

}