
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Ecole} from "./ecole.model";




@Injectable({
    providedIn: 'root'
  })
export class EcoleService {
  private url:string=API_URL+"admin/";


  constructor(private http:HttpClient){

  }
  /*addSousCategorie(souscategorie: Object): Observable<Object> {
    return this.http.post(this.url+ 'createCategory',JSON.stringify(souscategorie), {responseType: 'text'});
  }*/
  addEcole(ecole: Object): Observable<Object> {
    return this.http.post(this.url+ 'createSchool',JSON.stringify(ecole), {responseType: 'text'});
  }


  getAllEcole(): Observable<Ecole[]> {
    return this.http.get<Ecole[]>(this.url + 'getAllSchools');

  }
  getEcoleById(id:number):Observable<Ecole>{
    return this.http.get<Ecole>(this.url+"getSchoolbyId?id="+id);
  }

  deleteEcole(id:number):Observable<string>{
    return this.http.get<string>(this.url+"deleteSchoolById?id="+id);
  }
  updateEcole(id:number,ecole:Object):Observable<Object>{
    return this.http.post(this.url+"updateSchoolById?id="+id,ecole, {responseType: 'text'});
  }

}

