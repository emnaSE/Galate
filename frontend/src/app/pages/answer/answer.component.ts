import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { Subject } from 'rxjs';
import {AnswerService} from "./answer.service";
import {Answer} from "./answer.model";


@Component({
  selector: 'ngx-question',
  templateUrl: './answer.component.html',
})
export class AnswerComponent  implements OnInit{
  pageActuel: number =1;
  answers:Answer[];
  id:number;



    constructor(private router:Router,
                private activatedRouter:ActivatedRoute,
                private answerService:AnswerService

                ){
    this.id = this.activatedRouter.snapshot.params['id'];

      }
  ngOnInit() {

      this.answerService.getAnswerByQuestionId(this.id).subscribe(
        data=>{
          this.answers=data;
        },err=>{
          console.log(err);
        }
      )


  }

  create(){
     console.log("create");
  }
  update(answer:Answer){
      console.log("update")
      this.router.navigate(['pages/answer/',answer.id,'modifier'])

  }

  deleteByid(answer:Answer):void {
      this.answerService.deleteAnswer(answer.id).subscribe(
        data=>{
          alert("delete ave succes");
          this.router.navigate(['pages/question'])
        },err=>{
          console.log(err);
        }
      )
    console.log("delete;")
  }
}
