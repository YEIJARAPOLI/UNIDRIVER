import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class CreditCardService {

    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public getCreditCards(user, token) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(this.url + 'credit_card/' + user._id, {headers: headers}).map(res => res.json());
    }

    register(credit_card_to_register) {
        let params = JSON.stringify(credit_card_to_register);

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this._http.post(this.url + 'credit_card', params, {headers}).map(res => res.json());
    }
}