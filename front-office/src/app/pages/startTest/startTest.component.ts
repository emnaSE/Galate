import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { StartTestService} from './startTest.service';
import { Question, ChoiceMember } from './startTest.model';
import { Subject } from 'rxjs';
import { TestService } from '../test/test.service';
import { Timer } from './timer';
import { State } from './state';






@Component({
  selector: 'startTest',
  templateUrl: './startTest.component.html',
})
export class StartTestComponent  implements OnInit{
  pageActuel: number =1;
  private subcatgories:Question[]=[];
  dtTrigger: Subject<any> = new Subject();
  private map:Map<string,string>=new Map();
  testId:any;
  userId:any;
  memberId:any;
  testId1:any;
  memberId1:any;
  private testMemberId:any;
  private choiceMemberArray:ChoiceMember[]=[];

    constructor(private router:Router ,private startTestService: StartTestService , private testService:TestService,private activatedRoute:ActivatedRoute){ 

      this.testId=localStorage.getItem('testId');
      this.memberId=localStorage.getItem('memberId');
      this.testId1=this.activatedRoute.snapshot.params['idT'];
      this.memberId1=this.activatedRoute.snapshot.params['idM'];
 


      
     
      if(localStorage.getItem("memberId") !== null && localStorage.getItem("testId") !== null){
        this.getTestMember() ;
      }
      
     
    }
  ngOnInit() {
    if(localStorage.getItem("memberId")  === null){
      this.router.navigate(['/login']);
    }
     if((localStorage.getItem("testId")===null) && (this.testId1!== null)){
      this.router.navigate(['/loginTest', this.testId1 , this.memberId1]);
    }
    if(localStorage.getItem("memberId") !== null && localStorage.getItem("testId") !== null){
      this.getTestMember() ;
    }


    

    this.startTestService.getTestDetails(this.testId).subscribe(
      data=>{
        this.subcatgories=data;
        this.dtTrigger.next();
      },err=>{
        console.log(err);
      }
    );
    this._timer.start();
  
    }

    public logout (event){
      localStorage.clear();
      this.router.navigate(['/login'])
   }


    //chronometre
    private _btnPlay: string = 'Démarrer';
    private _timer: Timer = new Timer(this.router);
    private _state: State = new State();

     
    play() {
        this._timer.start();
        this._state.setPlay();
        this._btnPlay = 'Continuer';
    }
    stop() {
        this._timer.stop();
        this._state.setStop();
    }
    backward() {
        this._timer.reset();
        this._state.setBackward();
        this._btnPlay = 'Démarrer';
    }




   



   public getTestDetails() {
    this.startTestService.getTestDetails(this.testId).subscribe(
      data=>{
        this.subcatgories=data;
        this.dtTrigger.next();
      },err=>{
        console.log(err);
      }
    )
  }

  public getTestMember() {
    this.startTestService.getTestMember(this.testId, this.memberId).subscribe(
      data=>{
        var dataObj=JSON.parse(JSON.stringify(data));
        if(dataObj!==null){
          this.testMemberId=JSON.parse(JSON.stringify(data)).id;
          console.log("testMemberId= "+this.testMemberId);
        }
      },err=>{
        console.log(err);
      }
    )
  }

 
  public totalQuestionsSize(){
    let questionsSize=0;
    this.subcatgories.forEach(subcatgory => {

        subcatgory.questions.forEach(question => {
          if(question.answers.length!=0){
            questionsSize=questionsSize+1;
          }
        });

    });
    return questionsSize;
  }
 
 
  public saveAnswer(questionId, answerId){
    this.map.set(questionId,answerId);
  }
 
  
  public saveResult(){
      if(this.map.size!==this.totalQuestionsSize()){
        alert("merci de repondre à toutes les questions avant de passer!");
        return;
      }
      var choiceMember;
    
      this.map.forEach((value: string, key: string) => {
          let choiceMember=new ChoiceMember();
          choiceMember.id_test_member=this.testMemberId;
          choiceMember.id_question=key;
          choiceMember.id_answer=value; 
          console.log("key==> "+choiceMember.id_question+" value==> "+choiceMember.id_answer); 
          this.choiceMemberArray.push(choiceMember);  
        
      });
     this.choiceMemberArray.forEach(element => {
      console.log("element==> "+JSON.stringify(element));   
     });
        var json= '{ "choices":'+JSON.stringify(this.choiceMemberArray)+'}';
        console.log("json==> "+json);   

        //this.createMemberChoices(json);
        this.saveTestResult(this.testId, this.memberId,json); 
       
  }
  

  /*public createMemberChoices(json) {
    this.startTestService.createMemberChoices(json)
    .subscribe(data =>{
      console.log("data==>"+data);
    } , error => console.log('err'+error));
  }*/

  public saveTestResult(testId,userId,choices) {
    this.startTestService.saveTestResult(testId,userId,choices)
    .subscribe(data =>{
      this.router.navigate(['/download' , this.testId , this.memberId]);
    } , error => console.log('err'+error));
  }

  
 
}












 
  

  


