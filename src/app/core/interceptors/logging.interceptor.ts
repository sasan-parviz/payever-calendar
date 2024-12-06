import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RandomLogInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Generate random log details
    const randomId = Math.random().toString(36).substring(2, 8); // Random identifier
    const timestamp = new Date().toISOString(); // Current timestamp
    const message = `Random log - ID: ${randomId}, Timestamp: ${timestamp}`;

    // Log before the request is sent
    console.log(`[Interceptor] Before sending request: ${message}`);

    // Pipe through the request lifecycle
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
