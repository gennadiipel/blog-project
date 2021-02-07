import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/admin/shared/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _authService: AuthService,
        private _router: Router
        ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this._authService.isAuthenticated()) {
            req = req.clone({
                setParams: {
                    auth: this._authService.token
                }
            })
        }

        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401) this._router.navigate(['/admin', 'login'])
                return throwError(error)
            })
        )
    }

}