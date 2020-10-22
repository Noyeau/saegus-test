import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.authService.jwtToken;
        let authReq
        if (authToken) {
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer '+authToken)
            });
        } else {
            authReq = req.clone();
        }


        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}