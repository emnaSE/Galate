import {Categorie} from "../dashboard/categorie.model";

export interface SousCategorie {
     id?:number;
     name?: string;
     categorie?: string;
     id_category?:Categorie[];
     down_description?:any;
     up_description?:any;



  }
