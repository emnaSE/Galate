import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { TestService } from './test.service';
import { Test } from './test';
import { Subject, BehaviorSubject, Observable } from 'rxjs';




@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  implements OnInit{

  private tests:Test[]=[];
  dtTrigger: Subject<any> = new Subject();
  private currentUserSubject: BehaviorSubject<Test>;
    public currentUser: Observable<Test>;



    constructor(private router:Router, private testService: TestService){ 
      this.currentUserSubject = new BehaviorSubject<Test>(JSON.parse(localStorage.getItem('testId')));
      this.currentUser = this.currentUserSubject.asObservable();
    
    }

  ngOnInit() { 
    this.testService.getAllTests().subscribe(
      data=>{
        this.tests=data;
        this.dtTrigger.next();
      },err=>{
        console.log(err);
      }
    )


    
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  public getAllTests() {
    this.testService.getAllTests().subscribe(
      data=>{
        this.tests=data;
        this.dtTrigger.next();
      },err=>{
        console.log(err);
      }
    )
  }
  

  public testsList:Array<any>;

  public startTest(event, itemId ) {
    
        console.log(itemId);
        localStorage.setItem('testId',itemId );
        this.router.navigate(['/loginTest'])
        
     
  }


  

}
