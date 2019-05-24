
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Etalonnage} from "./etalonnage.model";




@Injectable({
    providedIn: 'root'
  })
export class EtalonnageService {
  private url:string=API_URL+"calcul/";


  constructor(private http:HttpClient){

  }
  /*addSousCategorie(souscategorie: Object): Observable<Object> {
    return this.http.post(this.url+ 'createCategory',JSON.stringify(souscategorie), {responseType: 'text'});
  }*/
  addEtalongae(etalonage:Object):Observable<Object>{
    return this.http.post(this.url+"createEtalonnage",JSON.stringify(etalonage),{responseType: 'text'});

  }
  getAllEtalonage():Observable<Etalonnage[]>{
    return this.http.get<Etalonnage[]>(this.url+"getAllEtalonnages");
  }
  getById(id:number):Observable<Etalonnage>{
    return this.http.get<Etalonnage>(this.url+"getEtalonnageById?id="+id);
  }
  deleteEtalonage(id:number):Observable<boolean>{
    return this.http.get<boolean>(this.url+"deleteEtalonnage?id="+id);
  }
  updateEtalonnage(id:number,etalonage:Object):Observable<Object>{
    return this.http.post(this.url+"updateEtalonnage?id="+id,JSON.stringify(etalonage),{ responseType :'text'});
  }

}

