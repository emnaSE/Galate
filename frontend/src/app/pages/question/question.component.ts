import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { Subject } from 'rxjs';
import {QuestionService} from "./question.service";
import {Question} from "./question.model";
import {Ecole} from "../ecole/ecole.model";


@Component({
  selector: 'ngx-question',
  templateUrl: './question.component.html',
})
export class QuestionComponent  implements OnInit{
  pageActuel: number =1;
  questions:Question[];




    constructor(private router:Router,
                private questionService: QuestionService,
                ){

      }
  ngOnInit() {
      this.questionService.getAllQuestion().subscribe(
        data=>{
          this.questions=data;
        },err=>{
          console.log(err);
        }
      )





  }

  create(){
      this.router.navigate(['pages/question/create']);
  }
  update(question:Question){
      this.router.navigate(['pages/question',question.id,'modifier'])
  }

  deleteByid(question:Question):void {
    if(confirm("êtes-vous sûr de vouloir supprimer le cette question ")) {
      this.questionService.deleteById(question.id).subscribe(
        data=>{
           alert("cette questions est lié à des sous categorie vous ne pouvez pas le supprimer");

          this.router.navigate(['pages/question'])
          this.questionService.getAllQuestion().subscribe(
            data=>{
              this.questions=data;
            },err=>{
              console.log(err);

            }
          )

          this.questions=this.questions.filter(q=>q !==question)
          this.router.navigate(['pages/question'])


        },err =>{
          console.log(err);
        }
      )}
  }
  info(question:Question){
      this.router.navigate(['pages/answer/',question.id,'question'])
  }
}
