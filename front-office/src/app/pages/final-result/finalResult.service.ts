
import {API_URL} from "../../app.constant";

import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import { FinalResult } from './finalResult.model';
import { Finalcatalogue } from './finalcatalogue.model';




@Injectable({
    providedIn: 'root'
  })
export class FinalResultService {
  private url:string=API_URL+"member/";
  private url2:string=API_URL+"admin/";
  private url3:string=API_URL+"calcul/";
  private url8;
  _http: any;


  constructor(private http:HttpClient){

  }

    
     

    
      
      getAllSubcategoriesByTestMember(testId:number , memberId:number): Observable<any[]> {
        return this.http.get<any[]>(this.url3 +"getAllSubcategoriesByTestMember?id_test="+testId+"&id_member="+memberId);
      }
    
  
 }
