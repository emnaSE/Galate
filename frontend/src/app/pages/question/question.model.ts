import {SousCategorie} from "../subcategorie/subcategorie.model";

export interface Question {
    id?:number;
    name?: string;
    wording?:string;
    value?:number;
    id_test_subcategory?:SousCategorie[];




  }
