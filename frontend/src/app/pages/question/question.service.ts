
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Question} from "./question.model";




@Injectable({
    providedIn: 'root'
  })
export class QuestionService {
  private url:string=API_URL+"admin";


  constructor(private http:HttpClient){

  }


  addQuestion(question:Object):Observable<Object>{
    this.http.post(this.url+'createQuestion',JSON.stringify(question),{responseType: 'text'});
  }
  getAllQuestion():Observable<Question[]>{
    this.http.get<Question[]>(this.url+'getAllQuestion');
  }
  deleteById(id:number):Observable<boolean>{
    return this.http.get<boolean>(this.url+"deleteQuestion?id_question="+id);
  }
  updateById(id:number,question:any):Observable<any>{
    return this.http.post<any>(this.url+'updateQuestion?id_question='+id,question);
  }


}

