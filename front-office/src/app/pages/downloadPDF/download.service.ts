
import {API_URL} from "../../app.constant";

import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';





@Injectable({
    providedIn: 'root'
  })
export class DownloadService {
  private url:string=API_URL+"member/";
  private url2:string=API_URL+"admin/";
  private url3:string=API_URL+"calcul/";
  private url8;
  _http: any;


  constructor(private http:HttpClient){

  }

    
     

      generateReportAutodiagnostic(idTest:number , idMember:number):Observable<any> {
        var url8 = "http://localhost:8098/galateProject/rest/galate/generateReportAutodiagnostic?testId="+idTest+"&memberId="+idMember ;
        window.location.href=url8;
        return this.http.get<any>(url8);
       
      
    
      }
  
 }
