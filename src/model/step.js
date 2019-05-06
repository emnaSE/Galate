'use strict';


const mongoose=require('mongoose');

const StepSchema=mongoose.Schema({
    

  
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
var Step=module.exports=mongoose.model('Step', StepSchema);