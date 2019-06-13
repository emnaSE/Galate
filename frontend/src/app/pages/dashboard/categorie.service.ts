
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Categorie} from "./categorie.model";
import {SousCategorie} from "../subcategorie/subcategorie.model";




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

  deleteCategorie(id:number):Observable<Object>{
    return this.http.post(this.url+"deleteCategoryById?id="+id,id,{responseType: 'text'});
  }
  updateCategorie(id:number,categorie:Object):Observable<Object>{
    return this.http.post(this.url+"updateCategoryById?id="+id,categorie,{responseType: 'text'});
  }
  getAllSouCategorie(id:number):Observable<SousCategorie[]>{
    return this.http.get<SousCategorie[]>(this.url+"getAllSubcategoriesByCategory?idCategory="+id);
  }

}

