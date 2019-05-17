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





  }

  create(){
      this.router.navigate(['pages/question/create']);
  }
  update(question:Question){
      this.router.navigate(['pages/question/',question.id,'modifier'])
  }
/*
  deleteByid(question:Question):void {
    if(confirm("êtes-vous sûr de vouloir supprimer le cette question ")) {
      this.questionService.deleteById(question.id).subscribe(
        data=>{
          if(data==="success"){

            alert("Suppression avec succès");
          }else{
            alert("Vous ne pouvez pas supprimer cette question");

          }
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
  };*/
}
