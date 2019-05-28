
import { Observable } from 'rxjs/Observable';
import {Test} from "./test.model";
import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Categorie} from "../dashboard/categorie.model";
import {text} from "@angular/core/src/render3";
import {BehaviorSubject} from "rxjs";




@Injectable({
    providedIn: 'root'
  })
export class TestService {

  private currentTestSubject: BehaviorSubject<Test>;
  public currentTest: Observable<Test>;
  private url:string=API_URL+"admin/";


  constructor(private http:HttpClient){

    this.currentTestSubject = new BehaviorSubject<Test>(JSON.parse(localStorage.getItem('currentTest')));
    this.currentTest = this.currentTestSubject.asObservable();

  }

  public get currentTestValue(): any {
    return this.currentTestSubject.value;
  }



  getAllTest():Observable<Test[]>{
    return this.http.get<Test[]>(this.url+"getAllTests");
  }

  affectCategorie(id:number,test:Test):Observable<any>{
    return this.http.post<any>(this.url+"affectCategoriesToTest?testId="+id,test);
  }


  affectSubCategorie(id:number,test:Test):Observable<any>{
    return this.http.post<any>(this.url+"affectSubcategoriesToTest?testId="+id,test);
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

  deleteTest(id:number):Observable<Object>{
    return this.http.post(this.url+"deleteTestById?id="+id,{responseType: 'text'});
  }
  updateTest(id:number,test:Object):Observable<Object>{
    return this.http.post(this.url+"updateTestById?id="+id,JSON.stringify(test),{responseType: 'text'});
  }
  getAllSubcategoriesByTestId(id:number):Observable<any>{
    return this.http.get<any>(this.url+"getAllSubcategoriesByTestId?id_test="+id);
  }

  getAllCategoriesByTestId(id:number):Observable<any>{
    return this.http.get<any>(this.url+"getCategoriesByTestId?testId="+id);
  }


  getAffectationById(id:number):Observable<any>{
    return this.http.get<any>(this.url+"getSubCategoriesByTestId?testId="+id);
  }

  getAffectationCategorieById(id:number):Observable<any>{
    return this.http.get<any>(this.url+"getCategoriesByTestId?testId="+id);
  }


}

