
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Question} from "./question.model";




@Injectable({
    providedIn: 'root'
  })
export class QuestionService {
  private url:string=API_URL+"admin/";


  constructor(private http:HttpClient){

  }

//version beta
  addQuestion(question:Object):Observable<Object>{
    return this.http.post(this.url+'createQuestion',JSON.stringify(question),{responseType: 'text'});
  }
  getAllQuestion():Observable<Question[]>{
    return this.http.get<Question[]>(this.url+'getAllQuestion');
  }
  deleteById(id:number):Observable<Object>{
    return this.http.get(this.url+"deleteQuestionById?id_question="+id,{responseType: 'text'});
  }
  updateById(id:number,question:any):Observable<any>{
    return this.http.post<any>(this.url+'updateQuestion?id_question='+id,question);
  }
  getQuestionById(id:number):Observable<Question>{
    return this.http.get<Question>(this.url+"getQuestionById?id="+id);
  }

  addQuestionByIdSub(id:number,test_id:number,question:Object):Observable<Object>{
    return this.http.post(this.url+"createQuestion_Answers?testId="+test_id+"&subcategoryId="+id,JSON.stringify(question),{responseType: 'text'});
  }

}

