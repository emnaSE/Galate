
import {API_URL} from "../../app.constant";

import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';




@Injectable({
    providedIn: 'root'
  })
export class RegisterService {
  private url:string=API_URL+"member/";


  constructor(private http:HttpClient){

  }

      addMember(clas: Object): Observable<Object> {
        return this.http.post(this.url+ 'register',JSON.stringify(clas), {responseType: 'text'});
      }

     
      }
