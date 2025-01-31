import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CachedService} from '../../services/cached.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private cachedService: CachedService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = sessionStorage.getItem('user');
    const userJson  = JSON.parse(user);
    const authToken = !!userJson ? userJson['stsTokenManager']?.accessToken : null;

    if (['POST', 'PUT', 'DELETE'].includes(request.method) && !request.url.includes('/ms-reclamation/reclamations/company')) {
      this.cachedService.invalidateCache();
    }

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
