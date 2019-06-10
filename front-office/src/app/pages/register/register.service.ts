

import {API_URL} from "../../app.constant";

import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import { School } from './school.model';
import { Clazz } from './clazz.model';




@Injectable({
    providedIn: 'root'
  })
export class RegisterService {
  private url:string=API_URL+"member/";
  private url2:string=API_URL+"admin/";


  constructor(private http:HttpClient){

  }

      addMember(register: Object): Observable<Object> {
        return this.http.post(this.url+ 'register',JSON.stringify(register));
      }

      getAllClazz(): Observable<Clazz[]> {
        return this.http.get<Clazz[]>(this.url2 +'getAllClasses');
    
      }

      getAllSchool(): Observable<School[]> {
        return this.http.get<School[]>(this.url2 +'getAllSchools');
    
      }
  
 }
