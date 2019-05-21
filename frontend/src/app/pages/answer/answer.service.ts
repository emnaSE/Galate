
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Answer} from "./answer.model";




@Injectable({
    providedIn: 'root'
  })
export class AnswerService {
  private url:string=API_URL+"admin/";


  constructor(private http:HttpClient){

  }

  addAnswer(answer:Object):Observable<Object>{
    return this.http.post(this.url+'createAnswer',JSON.stringify(answer),{responseType: 'text'});
  }

  deleteAnswer(id:number):Observable<boolean>{
    return this.http.get<boolean>(this.url+'deleteAnswer?answer_id='+id);
  }

  updateAnswer(id:number,anwser:any):Observable<any>{
    return this.http.post<any>(this.url+'updateAnswer?answer_id='+id,anwser)
  }
  getAnswerByQuestionId(id:number):Observable<Answer[]>{
    return this.http.get<Answer[]>(this.url+'getAllAnswerByQuestion?id_question='+id);
  }

}

