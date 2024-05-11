import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = sessionStorage.getItem('user');
    const authToken = !!user ? user['stsTokenManager']?.accessToken : null;

    if (authToken) {
      // Clone the request and add the token header
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Pass the cloned request to the next handler
      return next.handle(authRequest);
    }

    // If no token, pass the original request
    return next.handle(request);
  }
}
