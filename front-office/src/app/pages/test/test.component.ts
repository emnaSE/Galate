import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { TestService } from './test.service';
import { Test } from './test';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { moveEmbeddedView } from '@angular/core/src/view';




@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  implements OnInit{

  private tests:Test[]=[];
  dtTrigger: Subject<any> = new Subject();
  private currentUserSubject: BehaviorSubject<Test>;
    public currentUser: any;

    private testDurationSubject: BehaviorSubject<Test>;
    public testDuration: Observable<Test>;

    public memberId: any ;



    constructor(private router:Router, private testService: TestService ,private loginService:LoginService , private activatedRoute:ActivatedRoute){ 

      

     
        this.memberId=localStorage.getItem('memberId');
       
  

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

    if(localStorage.getItem("memberId") === null){
     // this.router.navigate(['/login']);
     this.router.navigate(['/register']);
    }
   


    
  }

  public logout (event){
    localStorage.clear();
    this.router.navigate(['/register'])
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
        this.router.navigate(['/loginTest' ,itemId , this.memberId]);
        //this.router.navigate(['/loginTest'])
        
     
  }


  

}
