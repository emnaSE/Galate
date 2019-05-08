'use strict';


const mongoose=require('mongoose');

const SubCategorySchema=mongoose.Schema({
    

    name: {
        type: String
    },
    idCategory:{
        type: String
    },
    downDescription:{
        type: String
    },
    upDescription:{
        type: String
    }
})
var SubCategory=module.exports=mongoose.model('SubCategory', SubCategorySchema);