import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/shared/interfaces/user.interface";
import { environment } from "src/environments/environment";
import { tap } from 'rxjs/operators';
import { FbAuthResponse } from "src/app/shared/interfaces/fb-auth-response.interface";

@Injectable()

export class AuthService {
    constructor (
        private httpClient: HttpClient
    ) {

    }

    get token(): string {
        const expDate = new Date(localStorage.getItem('fb-token-exp'))
        if (new Date() > expDate) {
            this.logout()
            return null
        }

        return localStorage.getItem('fbToken')
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.key}`, user)
        .pipe(
            tap(this.setToken)
        )
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(user: User): boolean {
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
}