import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  private baseUrl = 'http://localhost:3005/member';

  constructor(private http: HttpClient) { }


  login(login: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/login`, login);
  }
}
