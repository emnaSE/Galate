
import {API_URL} from "../../app.constant";

import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import { ResultTable } from './resultTable.model';
import { Catalogue } from './Catalogue.model';




@Injectable({
    providedIn: 'root'
  })
export class ResultTableService {
  private url:string=API_URL+"member/";
  private url2:string=API_URL+"admin/";
  private url3:string=API_URL+"calcul/";


  constructor(private http:HttpClient){

  }

    
       getAllResultTable(): Observable<ResultTable[]> {
        return this.http.get<ResultTable[]>(this.url3 +'getEtalonnageResults?id_test=1&id_member=1');
    
      }
      getCategoryNameByMemberIdAndTestId(): Observable<Catalogue[]> {
        return this.http.get<Catalogue[]>(this.url3 +'getCategoryNameByMemberIdAndTestId?id_test=1&id_member=1');
    
      }

      getAllCatrogiesByTestMember(): Observable<ResultTable[]> {
        return this.http.get<ResultTable[]>(this.url3 +'getAllCatrogiesByTestMember?id_test=1&id_member=1');
    
      }
  
 }
