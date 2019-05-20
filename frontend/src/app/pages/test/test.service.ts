
import { Observable } from 'rxjs/Observable';
import {Test} from "./test.model";
import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Categorie} from "../dashboard/categorie.model";
import {text} from "@angular/core/src/render3";




@Injectable({
    providedIn: 'root'
  })
export class TestService {
  private url:string=API_URL+"admin/";


  constructor(private http:HttpClient){

  }
  getAllTest():Observable<Test[]>{
    return this.http.get<Test[]>(this.url+"getAllTests");
  }

  affectCategorie(id:number,test:Test):Observable<any>{
    return this.http.post<any>(this.url+"affectCategoriesToTest?testId="+id,test);
  }
  addTest(test:Object):Observable<Object>{
    return this.http.post(this.url+"createTest",JSON.stringify(test),{responseType: 'text'});
  }
  getById(id:number):Observable<any>{
    return this.http.get<any>(this.url+"getTestById?id="+id);
  }
  getAllactivatedTest():Observable<Test[]>{
    return this.http.get<Test[]>(this.url+"getAllActivatedTests");
  }

  getAllaDisabledTest():Observable<Test[]>{
    return this.http.get<Test[]>(this.url+"getAllDisabledTests");
  }

  deleteTest(id:number):Observable<string>{
    return this.http.get<string>(this.url+"deleteTestById?id="+id);
  }
  updateTest(id:number,test:Object):Observable<Object>{
    return this.http.post(this.url+"updateTestById?id="+id,JSON.stringify(test),{responseType: 'text'});
  }
  getAllSubcategoriesByTestId(id:number):Observable<any>{
    return this.http.get<any>(this.url+"getAllSubcategoriesByTestId?id_test="+id);
  }

  affectSubCategorie(id:number,test:Test):Observable<any>{
    return this.http.post<any>(this.url+"affectSubCategoriesToTest?testId="+id,test);
  }
}

