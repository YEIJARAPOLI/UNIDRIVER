import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class UserService {

    public url: string;
    public identity: string;
    public token: string;
    public registro: string;
    public reload;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    singUp(user_to_login, gethash = null) {
        if (gethash != null) {
            user_to_login.gethash = gethash;
        }
        
        let json = JSON.stringify(user_to_login);
        let params = json;

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this._http.post(this.url + 'login', params, {headers}).map(res => res.json());
    }

    logOut() {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        localStorage.clear();
    }

    register(user_to_register) {
        let params = JSON.stringify(user_to_register);

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this._http.post(this.url + 'register', params, {headers}).map(res => res.json());
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');

        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    getUserRegister() {
        let registro = JSON.parse(localStorage.getItem('registro'));

        if (registro != "undefined") {
            this.registro = registro;
        } else {
            this.registro = null;
        }

        return this.registro;
    }

    getReload() {
        let reload = JSON.parse(localStorage.getItem('reload'));

        if (reload != "undefined") {
            this.reload = reload;
            console.log(this.reload);

            if(!reload) {
                this.reload = reload;
            } else {
                this.reload = true;
            }
        } else {
            this.reload = null;
        }

        return this.reload;
    }
}