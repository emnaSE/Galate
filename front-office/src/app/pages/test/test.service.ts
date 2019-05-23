import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {API_URL} from "../../app.constant";
import { Test } from './test';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TestService {
  private url:string=API_URL+"admin/";
  private currentUserSubject: BehaviorSubject<Test>;
  public currentUser: Observable<Test>;
  private testDurationSubject: BehaviorSubject<Test>;
  public testDuration: Observable<Test>;

  constructor(private http: HttpClient) {


    
    this.currentUserSubject = new BehaviorSubject<Test>(JSON.parse(localStorage.getItem('testId')));
    this.currentUser = this.currentUserSubject.asObservable();


    this.testDurationSubject = new BehaviorSubject<Test>(JSON.parse(localStorage.getItem('testDuration')));
    this.testDuration = this.currentUserSubject.asObservable();
   }
  
  getAllTests():Observable<Test[]>{
    return this.http.get<Test[]>(this.url+'getAllTests');
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
}

public get testDurationValue(): any {
  return this.testDurationSubject.value;
}

 
}
