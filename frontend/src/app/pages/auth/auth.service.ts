import {HttpClient} from '@angular/common/http';
import {Observable,BehaviorSubject,throwError} from 'rxjs';

import {Injectable} from "@angular/core";
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";
import {User} from "./user.model";
import {API_URL} from "../../app.constant";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  err:any;


  private url:string=API_URL+'admin/login';

  constructor(private http:HttpClient,
              private router:Router){
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();


  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  Login(username: string, password: string){
    return this.http.post<any>(this.url,{ username, password }).pipe(
      map(
        data=>{
          if (data.status==200){
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.currentUserSubject.next(data);

            return data;
          }else{
            return Observable.throw(this.err);


          }

        }
      )
    )
  }/*
  getAuthenticatedUser() {
    return localStorage.getItem(username)
  }
  isUserLoggedIn() {
    let user = localStorage.getItem(username)
    return username;
  }*/
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
