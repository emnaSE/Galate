'use strict';


const mongoose=require('mongoose');


const AnswerSchema=mongoose.Schema({
    

    idQuestion: {
        type: String
    },
    value: {
        type: Number
    },
    name: {
        type: String
    }
})
var Answer=module.exports=mongoose.model('Answer', AnswerSchema);