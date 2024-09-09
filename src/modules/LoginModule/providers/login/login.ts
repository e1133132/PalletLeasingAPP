import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../../../shared/ApiURL";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  loginUrl;
  apiUrl;

  ionViewWillEnter() {
    this.apiUrl = this.api.getApiUrl();
  }

  constructor(public http: HttpClient,
              private api: ApiURL) {
    console.log('Hello LoginProvider Provider');
  }

  getToken(username:string, password: string):Promise<any> {
    this.loginUrl = this.api.getApiUrl().concat('token');
    // this.loginUrl = "http://localhost/LHPWebApi/token";
    let body = new URLSearchParams();
    body.set('UserName', username);
    body.set('Password', password);
    body.set('grant_type', 'password');

    let httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    return this.http.post(this.loginUrl, body.toString(), httpOptions).take(1).toPromise();
  }

}
