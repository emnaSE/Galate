
import { Observable } from 'rxjs/Observable';

import {Injectable} from "@angular/core";

import { HttpClient, HttpRequest } from '@angular/common/http';
import {API_URL} from "../../app.constant";




@Injectable({
    providedIn: 'root'
  })
export class SubcategorieService {
  private url:string=API_URL;


  constructor(private http:HttpClient){

  }

}

