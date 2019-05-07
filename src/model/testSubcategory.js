'use strict';


const mongoose=require('mongoose');

const TestSubcategorySchema=mongoose.Schema({
    

  
    idCategory: {
        type: String
    },  
    idSubCategory: {
        type: String
    },
    idTest: {
        type: String
    },
    questionsNumber: {
        type: Number
    },
    wording: {
        type: String
    }
})
var TestSubcategory=module.exports=mongoose.model('TestSubcategory', TestSubcategorySchema);