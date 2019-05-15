'use strict';


const mongoose=require('mongoose');


const AnswerSchema=mongoose.Schema({
    

    id_question: {
        type: String
    },
    value: {
        type: Number
    },
    name: {
        type: String
    },
    ordre: {
        type: Number
    }
})
var Answer=module.exports=mongoose.model('Answer', AnswerSchema);