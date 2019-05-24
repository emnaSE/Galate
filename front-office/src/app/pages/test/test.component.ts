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

    private testDurationSubject: BehaviorSubject<Test>;
    public testDuration: Observable<Test>;



    constructor(private router:Router, private testService: TestService){ 
      this.currentUserSubject = new BehaviorSubject<Test>(JSON.parse(localStorage.getItem('testId')));
      this.currentUser = this.currentUserSubject.asObservable();

      this.testDurationSubject = new BehaviorSubject<Test>(JSON.parse(localStorage.getItem('testDuration')));
      this.testDuration = this.currentUserSubject.asObservable();
    
    }

  ngOnInit() { 
    this.testService.getAllActiveTests().subscribe(
      data=>{
        this.tests=data;
        this.dtTrigger.next();
      },err=>{
        console.log(err);
      }
    )

    if(localStorage.getItem("currentUser") === null){
      this.router.navigate(['/login']);
    }else  if(localStorage.getItem("testId") === null){
      this.router.navigate(['/test']);
    }


    
  }

  public logout (event){
    localStorage.clear();
    this.router.navigate(['/login'])
 }

  public get testDurationValue(): any {
    return this.testDurationSubject.value;
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  public getAllActiveTests() {
    this.testService.getAllActiveTests().subscribe(
      data=>{
        this.tests=data;
        this.dtTrigger.next();
      },err=>{
        console.log(err);
      }
    )
  }
  



  public startTest(event, itemId , durationTest) {
    
        console.log(itemId);
        localStorage.setItem('testId',itemId );
        localStorage.setItem('testDuration',durationTest );
        this.router.navigate(['/loginTest',itemId]);
        //this.router.navigate(['/loginTest'])
        
     
  }


  

}
