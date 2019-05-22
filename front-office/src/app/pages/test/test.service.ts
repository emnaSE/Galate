import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {API_URL} from "../../app.constant";
import { Test } from './test';

@Injectable()
export class TestService {
  private url:string=API_URL+"admin/";



  constructor(private http: HttpClient) { }
  
  getAllTests():Observable<Test[]>{
    return this.http.get<Test[]>(this.url+'getAllTests');
  }


 
}
