'use strict';


const mongoose=require('mongoose');


const QuestionSchema=mongoose.Schema({
    

    value: {
        type: Number
    },
    name: {
        type: String
    },
    wording: {
        type: String
    },
    idTestSubcategory: {
        type: String
    }
})
var Question=module.exports=mongoose.model('Question', QuestionSchema);