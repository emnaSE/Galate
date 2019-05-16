import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {API_URL} from "../../app.constant";
import { StartTest } from './startTest.model';


@Injectable()
export class StartTestService {
  private url:string=API_URL+"admin/";



  constructor(private http: HttpClient) { }
  
  getTestDetails():Observable<StartTest[]>{
    return this.http.get<StartTest[]>(this.url+'getTestDetails');
  }



  private map = new Map<String, String>([

    ["aa" , "aa"],
    ["bb" , "bb"],
    ["cc" , "cc"],
    ["dd" , "dd"]

  ]) ;

  private _todoList = [
    { text: 'aa' },
    { text: 'bb'},
    { text: 'cc'},
    { text: 'dd'},
    { text: 'ff' },
    { text: 'aa' },
    { text: 'qq'},
    { text: 'aa' },
    
  ];

  getTodoList2() {
    return this.map;
    
  }
 

  getTodoList() {
    return this._todoList;
    
  }

  
}
