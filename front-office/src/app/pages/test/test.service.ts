import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {API_URL} from "../../app.constant";
import { Test } from './test';

@Injectable()
export class TestService {
  private url:string=API_URL+"admin/";



  constructor(private http: HttpClient) { }
  
  getAllTests():Observable<Test[]>{
    return this.http.get<Test[]>(this.url+'getAllTests');
  }



  private _todoList = [
    { text: 'Check me out' },
    { text: 'Curabitur dignissim nunc a tellus euismod, quis pretium ipsum convallis'},
    { text: 'Vivamus dapibus pulvinar ipsum, sit amet elementum sapien tincidunt non'},
    { text: 'Praesent viverra nisl a pharetra viverra'},
    { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
    { text: 'Ex has semper alterum, expetenda dignissim' },
    { text: 'Nulla nisl urna, lobortis in leo vel, porta faucibus nulla'},
    { text: 'Simul erroribus ad usu' },
    { text: 'Ei cum solet appareat, ex est graeci mediocritatem' },  
    { text: 'Have fun with blur admin' },
    { text: 'What do you think?' },
    { text: 'Proin non felis vitae ipsum dignissim tempus nec a libero' }
  ];

  getTodoList() {
    return this._todoList;
  }
}
