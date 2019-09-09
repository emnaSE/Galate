
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
  private url8:string=API_URL+"pdf/";
  _http: any;


  constructor(private http:HttpClient){

  }

    
     

      generateReportAutodiagnostic(idTest:number , idMember:number):Observable<any> {
       // var url9 = "http://localhost:8101/galateProject/rest/galate/generateReportAutodiagnostic?testId="+idTest+"&memberId="+idMember ;
        var url9 = "http://173.212.247.77:8080/pdf/rest/galate/generateReportAutodiagnostic?testId="+idTest+"&memberId="+idMember ;
        //var url9 = "http://167.86.108.108:8080/pdf/rest/galate/generateReportAutodiagnostic?testId="+idTest+"&memberId="+idMember ;
        window.location.href=url9;
        return this.http.get<any>(url9);
      }

      downloadPersonalityAnalyse(idTest:number , idMember:number):Observable<any> {
       // var url9 ="http://localhost:8101/galateProject/rest/galate/generateReportPersonalityAnalyse?testId="+idTest+"&memberId="+idMember ;
       // var url9 = "http://167.86.108.108:8080/pdf/rest/galate/generateReportPersonalityAnalyse?testId="+idTest+"&memberId="+idMember ;
       var url9 = "http://173.212.247.77:8080/pdf/rest/galate/generateReportPersonalityAnalyse?testId="+idTest+"&memberId="+idMember ;
        window.location.href=url9;
        return this.http.get<any>(url9);
      }

      downloadCompetences(idTest:number , idMember:number):Observable<any> {
        //var url9 ="http://localhost:8101/galateProject/rest/galate/generateReportCompetence?testId="+idTest+"&memberId="+idMember ;
       // var url9 = "http://167.86.108.108:8080/pdf/rest/galate/generateReportCompetence?testId="+idTest+"&memberId="+idMember ;
       var url9 = "http://173.212.247.77:8080/pdf/rest/galate/generateReportCompetence?testId="+idTest+"&memberId="+idMember ;
        window.location.href=url9;
        return this.http.get<any>(url9);
      }

      calculateSkills(testId:number , memberId:number): Observable<any[]> {
        return this.http.get<any[]>(this.url3 +"calculateSkills?testId="+testId+"&memberId="+memberId);
      }
  
 }
