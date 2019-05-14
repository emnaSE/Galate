
import { Observable } from 'rxjs/Observable';
import {Test} from "./test.model";
import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";




@Injectable({
    providedIn: 'root'
  })
export class TestService {
  private url:string=API_URL;


  constructor(private http:HttpClient){

  }
  getAllTest():Observable<Test[]>{
    return this.http.get<Test[]>(this.url+"getAllTests");
  }

  affectCategorie(test:Test):Observable<Test[]>{
    return this.http.post<Test[]>(this.url+"AffectCategoriesToTest",test);
  }
  addTest(test:Test):Observable<Test[]>{
    return this.http.post<Test[]>(this.url+"createTest",test);
  }
  getById(id:number):Observable<any>{
    return this.http.get<any>(this.url+"getTest"+id);
  }
}

