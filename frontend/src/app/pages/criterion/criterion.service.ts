
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Criterion} from "./criterion.model";
import { Categorie } from '../dashboard/categorie.model';




@Injectable({
    providedIn: 'root'
  })
export class CriterionService {
  private url:string=API_URL+"admin/";


  constructor(private http:HttpClient){

  }
  createCriterion(criterion: Object): Observable<Object> {
    return this.http.post(this.url+ 'createCriterion',JSON.stringify(criterion), {responseType: 'text'});
  }

  getAllCriterions():Observable<Criterion[]>{
    return this.http.get<Criterion[]>(this.url+"getAllCriterions");
  }
  getCriterionById(id:number):Observable<Criterion>{
    return this.http.get<Criterion>(this.url+"getCriterionById?id="+id);
  }
  getAllCriterionsBySubcategory(id:number):Observable<Criterion[]>{
    return this.http.get<Criterion[]>(this.url+"getAllCriterionsByCategory?id_category="+id);
  }
  updateCriterion(id:number,criterion:any):Observable<any>{
    
    return this.http.post(this.url+"updateCriterion?id="+id,criterion,{responseType:'text'});
  }

  deleteCriterion(id:number):Observable<Object>{
    return this.http.post(this.url+"deleteCriterion?id="+id, {responseType: 'text'});
  }

  getAllCriterionsByTestId(id:number):Observable<Criterion[]>{
    return this.http.get<Criterion[]>(this.url+"getAllCriterionsByTestId?id_test="+id);
  }
  /*getAllTest(id_subCat:number):Observable<any>{
    return this.http.get<any>(this.url+"getCriterionById?idTestSubcategory="+id_subCat);
  }*/

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.url + 'getAllCategories');
  }
  
  getAllSubcategoriesByCriterionId(criterionId:number): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.url + "getAllSubcategoriesByCriterionId?criterionId="+criterionId);

  }

}


