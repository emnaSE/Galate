
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";




@Injectable({
    providedIn: 'root'
  })
export class ClassService {
  private url:string=API_URL;


  constructor(private http:HttpClient){

  }
  /*addSousCategorie(souscategorie: Object): Observable<Object> {
    return this.http.post(this.url+ 'createCategory',JSON.stringify(souscategorie), {responseType: 'text'});
  }*/

}

