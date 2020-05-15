import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class SecondInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Second Interceptor: outgoing request');
        console.log('Second Interceptor: ' + req.url)
        return next.handle(req).pipe( tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log("Second Interceptor: incoming response");
                console.log("Second Interceptor: " + event.body)
            }
        })) 
    }
}