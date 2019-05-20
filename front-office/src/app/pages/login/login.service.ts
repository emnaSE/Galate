import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {API_URL} from "../../app.constant";

@Injectable()
export class LoginService {

  private url:string=API_URL+"member/";
  constructor(private http: HttpClient) { }


  login(login: Object): Observable<Object> {
    return this.http.post(`${this.url}` + `/login`, login);
  }
}
