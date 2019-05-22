import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {API_URL} from "../../app.constant";
import { Question } from './startTest.model';


@Injectable()
export class StartTestService {
  private url:string=API_URL+"admin/";



  constructor(private http: HttpClient) { }
  
  getTestDetails():Observable<Question[]>{
    return this.http.get<Question[]>(this.url+'getAllQuestionsByTestSubcategories?testId='+1);
  }

 


  
}
