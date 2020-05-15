import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class InterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // We can also check the req URL, and stop it from sending if it matches a certain pattern. We will not implement this yet.
        console.log('First interceptor: Request sent');

        const modifiedRequest = req.clone(
            {
                headers: req.headers.append('interceptorHeader', 'maa ma ma')
            }
        ) // We can modify request headers, params, URL, etc.

        return next.handle(modifiedRequest)
        // next.handle lets the request continue after being intercepted
    }
}