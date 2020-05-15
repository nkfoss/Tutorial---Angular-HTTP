import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class InterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // We can also check the req URL, and stop it from sending if it matches a certain pattern. We will not implement this yet.
        console.log('Request sent');
        return next.handle(req);  // This lets the request continue after being intercepted
    }
}