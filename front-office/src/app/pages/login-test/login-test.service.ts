import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {API_URL} from "../../app.constant";

@Injectable()
export class LoginTestService {

  private url:string=API_URL+"member/";
  private urlAdmin:string=API_URL+"admin/";
  constructor(private http: HttpClient) { }


  loginForTest(login: Object , testId:number, memberId:number): Observable<Object> {
    return this.http.post(`${this.url}` + `loginForTest?testId=`+testId+'&memberId='+memberId, login,{responseType:'text'});
  }

  createDefaultTestResult(testId:number, memberId:number): Observable<Object> {
    return this.http.get(`${this.urlAdmin}` + `createDefaultTestResult?idTest=`+testId+'&idMember='+memberId);
  }

 
  
}
