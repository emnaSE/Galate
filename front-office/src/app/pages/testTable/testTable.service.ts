
import {API_URL} from "../../app.constant";

import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import { TestTable } from './testTable.model';





@Injectable({
    providedIn: 'root'
  })
export class TestTableService {
 
  private url:string=API_URL+"admin/";
  



  constructor(private http:HttpClient){

  }

    
     

      getAllQuestionsByTestSubcategories(testId:number ): Observable<any[]> {
        return this.http.get<any[]>(this.url +"getAllQuestionsByTestSubcategories?testId="+testId);
      
    
      }
    

     
  
 }
