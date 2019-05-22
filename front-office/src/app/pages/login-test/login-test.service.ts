import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {API_URL} from "../../app.constant";

@Injectable()
export class LoginTestService {

  private url:string=API_URL+"member/";
  constructor(private http: HttpClient) { }


  login(login: Object , testId:number): Observable<Object> {
    return this.http.post(`${this.url}` + `/loginForTest?testId=`+testId, login);
  }
}
