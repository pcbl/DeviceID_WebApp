import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DeviceIdInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    var headers = new HttpHeaders();
    if(localStorage.getItem('fingerprint')) 
    {
      request = request.clone({ headers: request.headers.set('fingerprint',localStorage.getItem('fingerprint')) });
    }
    if(localStorage.getItem('device-id')) 
    {
      request = request.clone({ headers: request.headers.set('device-id',localStorage.getItem('device-id')) });
    }       
   return next.handle(request)     
  }
}
