
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
  private url8;
  _http: any;


  constructor(private http:HttpClient){

  }

    
       getAllResultTable(): Observable<ResultTable[]> {
        return this.http.get<ResultTable[]>(this.url3 +'getEtalonnageResults?id_test=1&id_member=1');
    
      }
      getCategoryNameByMemberIdAndTestId(): Observable<Catalogue[]> {
        return this.http.get<Catalogue[]>(this.url3 +'getCategoryNameByMemberIdAndTestId?id_test=1&id_member=1');
    
      }

      getAllCatrogiesByTestMember(): Observable<any[]> {
        return this.http.get<any[]>(this.url3 +'getAllCatrogiesByTestMember?id_test=1&id_member=1');
      
    
      }
    

      updateManualAnswer(id:number,response:any):Observable<Object>{
        return this.http.post(this.url3 +"updateManualAnswer?manualAnwserId="+id+"&response="+response,JSON.stringify,{responseType:'text'});
      }
    

      generateReportAutodiagnostic(idTest:number , idMember:number):Observable<any> {
        var url8 = "http://localhost:8098/galateProject/rest/galate/generateReportAutodiagnostic?testId="+idTest+"&memberId="+idMember ;
        window.location.href=url8;
        return this.http.get<any>(url8);
       
      
    
      }
  
 }
