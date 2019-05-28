
import { Observable } from 'rxjs/Observable';
import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {BehaviorSubject} from "rxjs";
import {Home} from "./home.model";




@Injectable({
  providedIn: 'root'
})
export class HomeService {

//'http://192.168.1.42:3000/admin/getTestsByFilter?beginDate=2019-05-24%2000:00:00&endDate=2019-05-27%2011:00:00&maxAge=29&minAge=20'

  private url:string=API_URL+"admin/";


  constructor(private http:HttpClient){



  }

getStat(debut:any,fin:any,age1:number,age2:number):Observable<any>{

    return this.http.get<any>(this.url+'getTestsByFilter?beginDate='+debut+'&endDate='+fin+'&maxAge='+age1+'&minAge='+age2);
}




}

