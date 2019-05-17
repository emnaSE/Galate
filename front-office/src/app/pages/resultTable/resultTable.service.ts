
import {API_URL} from "../../app.constant";

import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import { ResultTable } from './resultTable.model';




@Injectable({
    providedIn: 'root'
  })
export class ResultTableService {
  private url:string=API_URL+"member/";
  private url2:string=API_URL+"admin/";
  private url3:string=API_URL+"calcul/";


  constructor(private http:HttpClient){

  }

    
      getAllSchool(): Observable<ResultTable[]> {
        return this.http.get<ResultTable[]>(this.url3 +'getEtalonnageResults?id_test=1&id_member=1');
    
      }
  
 }
