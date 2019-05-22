import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { StartTestService} from './startTest.service';
import { Question } from './startTest.model';
import { Subject } from 'rxjs';





@Component({
  selector: 'startTest',
  templateUrl: './startTest.component.html',
})
export class StartTestComponent  implements OnInit{
  pageActuel: number =1;
  private subcatgories:Question[]=[];
  dtTrigger: Subject<any> = new Subject();
  private map:Map<string,string>=new Map();



    constructor(private router:Router ,private startTestService: StartTestService){ 

   
     
    }
  ngOnInit() {
    this.startTestService.getTestDetails().subscribe(
      data=>{
        this.subcatgories=data;
        console.log(data[0].questions);
        this.dtTrigger.next();
      },err=>{
        console.log(err);
      }
    );

   }

   public getTestDetails() {
    this.startTestService.getTestDetails().subscribe(
      data=>{
        this.subcatgories=data;
        this.dtTrigger.next();
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
 
  
  public showResult(){
    console.log("mapsize= "+this.map.size+" questionsize= "+this.totalQuestionsSize());
    if(this.map.size===this.totalQuestionsSize()){
      this.router.navigate(['/test']);
    }else{
      alert("merci de repondre à toutes les questions avant de passer");
    }
    /*console.log("size== "+this.map.size);

    this.map.forEach((value: string, key: string) => {
      console.log(key, value);
    });*/
 
  
  }
  

  
}












 
  

  


