
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";
import {Class} from "./class.model";




@Injectable({
    providedIn: 'root'
  })
export class ClassService {
  private url:string=API_URL+"admin/";


  constructor(private http:HttpClient){

  }

      addClass(clas: Object): Observable<Object> {
        return this.http.post(this.url+ 'createClass',JSON.stringify(clas), {responseType: 'text'});
      }

      getAllClass(): Observable<Class[]> {
        return this.http.get<Class[]>(this.url + 'getAllClasses');

      }
      getClassById(id:number):Observable<Class>{
        return this.http.get<Class>(this.url+"getClassById?id="+id);
      }

      deleteClass(id:number):Observable<any>{
        return this.http.post<any>(this.url+"deleteClassById?id="+id,id);
      }
      updateClass(id:number,clas:Object):Observable<Object>{
        return this.http.post(this.url+"updateClassById?id="+id,JSON.stringify(clas), {responseType: 'text'});
      }

  getAllClassByScoohId(): Observable<Class[]> {
    return this.http.get<Class[]>(this.url + 'getAllClassesBySchool?id_school=');

  }
      }
