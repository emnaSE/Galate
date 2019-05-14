
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Categorie} from "./categorie.model";




@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private url:string=API_URL+"admin/";


  constructor(private http:HttpClient){

  }

  addCategorie(categorie: Object): Observable<Object> {
    return this.http.post(this.url+ 'createCategory',JSON.stringify(categorie), {responseType: 'text'});
  }

  getAllCategorie(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.url + 'getAllCategories');

  }
  getCategorieParId(id:number):Observable<Categorie>{
    return this.http.get<Categorie>(this.url+"getCategoryById?id="+id);
  }

  deleteCategorie(id:number):Observable<string>{
    return this.http.get<string>(this.url+"deleteCategoryById?id="+id);
  }
  updateCategorie(id:number,categorie:Categorie):Observable<Categorie>{
    return this.http.put<Categorie>(this.url+"updateCategory?id="+id,categorie);
  }

}

