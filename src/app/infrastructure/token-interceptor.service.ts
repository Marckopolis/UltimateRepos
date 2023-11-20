import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const API_KEY = '78d472ec54d8449134ef396bf2ee10c0';

const API_TOKEN = 'ATTA99f34c162918975ab6e0fa403d56d412039aa98bdc372eaf47fb926f5fed9c6f974A9D3E';

@Injectable({providedIn: 'root'})

export class TokenInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      req = req.clone({
        setHeaders: {
          Accept: 'application/json',
          'Authorization': 'OAuth oauth_consumer_key="' + API_KEY + '", oauth_token="'+API_TOKEN +'"'
        }
      });
      return next.handle(req);
  }
}
