import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { User } from "src/app/shared/interfaces/user.interface";
import { environment } from "src/environments/environment";
import { catchError, tap } from 'rxjs/operators';
import { FbAuthResponse } from "src/app/shared/interfaces/fb-auth-response.interface";

@Injectable()

export class AuthService {

    public error$:Subject<string> = new Subject<string>();

    constructor (
        private _httpClient: HttpClient
    ) {

    }

    get token(): string {
        const expDate = new Date(localStorage.getItem('fb-token-exp'))
        if (new Date() > expDate) {
            this.logout()
            return null
        }

        return localStorage.getItem('fb-token')
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this._httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.key}`, user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
        )
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    private setToken(response: FbAuthResponse | null) {

        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn*1000)
            localStorage.setItem('fb-token', response.idToken)
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }

        
    }

    private handleError(error: HttpErrorResponse) {
        const { message } = error.error.error

        switch (message) {
            case 'EMAIL_NOT_FOUND':
                this.error$.next('No such email')
                break
            case 'INVALID_EMAIL':
                this.error$.next('Wrong email')
                break
            case 'INVALID_PASSWORD':
                this.error$.next('Wrong password')
                break
        }

        return throwError(error)
    }
}