
import {Question} from "../question/question.model";

export interface Answer {
    id?:number;
    name?: string;
    ordre?:number;
    value?:number;
    id_question?:Question[];




  }
