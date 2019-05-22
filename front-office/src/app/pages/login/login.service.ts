import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {API_URL} from "../../app.constant";
import { BehaviorSubject } from 'rxjs';
import { Login } from './Login';

@Injectable()
export class LoginService {

  private url:string=API_URL+"member/";
  constructor(private http: HttpClient) { 

    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
  }


  login(login: Object): Observable<Object> {
    return this.http.post(`${this.url}` + `/login`, login);
  }
  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
}
}
