import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    public redirectUrl: string;

    constructor(private http: HttpClient) {}

    public get isLoggedIn() : boolean {
        const expiration = localStorage.getItem("session_expires");
        if (expiration == null) {
            return false;
        }

        const expiresAtMillisecionds = JSON.parse(expiration);
        return new Date().getTime() < expiresAtMillisecionds;
    }

    public login(username: string, password: string): Observable<boolean> {
        return this.http.post<any>("/auth/login", { username: username, password: password })
            .map(res => {
                if (res && res.idToken) {
                    let expiresAt = new Date();
                    expiresAt.setSeconds(expiresAt.getSeconds() + res.expiresIn);

                    localStorage.setItem('session_id', res.idToken);
                    localStorage.setItem('session_expires', JSON.stringify(expiresAt.getTime()));
                    return true;
                }
                return false;
            });
    }

    public signup(username: string, password: string): Observable<boolean> {
        return this.http.post<any>("/auth/signup", { username: username, password: password }, {observe: 'response' })
            .map(res => {
                return true;
            });
    }

    public getPassword(username: string): Observable<string> {
        return this.http.post<any>("/auth/get-password", { username: username })
            .map(res => {
                return res.password;
            });
    }

    public logout(): void {
        localStorage.removeItem("session_id");
        localStorage.removeItem("session_expires");
    }
}