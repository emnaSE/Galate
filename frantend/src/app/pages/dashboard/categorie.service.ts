
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Categorie} from "./categorie.model";




@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private url:string=API_URL;


  constructor(private http:HttpClient){

  }

  addCategorie(categorie: Object): Observable<Object> {
    return this.http.post(this.url+ 'createCategory',JSON.stringify(categorie), {responseType: 'text'});
  }

  getAllCategorie(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.url + 'getAllCategories');

  }

}

