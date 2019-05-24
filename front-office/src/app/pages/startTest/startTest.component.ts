import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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
  private choiceMemberArray:ChoiceMember[]=[];

    constructor(private router:Router ,private startTestService: StartTestService , private testService:TestService){ 

      this.testId=localStorage.getItem('testId');

      if(localStorage.getItem('currentUser')!== null){
      this.userId=JSON.parse(localStorage.getItem('currentUser')).member.id; }
      
     
    }
  ngOnInit() {
    if((localStorage.getItem("currentUser") === null)&&(localStorage.getItem("testId") === null)&&(localStorage.getItem("testDuration") === null)){
      this.router.navigate(['/login'])
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
    this.startTestService.getTestMember(this.testId, this.userId).subscribe(
      data=>{
        console.log(data);
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
    let choiceMember=new ChoiceMember();
    choiceMember.id_test_member=1;
    this.map.forEach((value: string, key: string) => {
        choiceMember.id_question=key;
        choiceMember.id_answer=this.map.get(key); 
        this.choiceMemberArray.push(choiceMember);   
    })

    var json = '{ "choices":'+JSON.stringify(this.choiceMemberArray)+'}';
    this.startTestService.createMemberChoices(json)
    .subscribe(data =>{
      this.router.navigate(['/resultTable']);
    } , error => console.log('err'+error));

  }
  

  
}












 
  

  


