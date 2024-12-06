import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { makeIso } from '../../shared/utils';

@Injectable()
export class RandomLogInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const randomId = Math.random().toString(36).substring(2, 8);
    const timestamp = makeIso(new Date());
    const message = `Random log - ID: ${randomId}, Timestamp: ${timestamp}`;
    console.log(`[Interceptor] Before sending request: ${message}`);

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          console.log(`[Interceptor] After request completes: ${message}`);
        },
        error: (error) => {
          console.error(`[Interceptor] Request failed: ${message}`, error);
        },
      })
    );
  }
}
