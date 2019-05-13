'use strict';


const mongoose=require('mongoose');


const ChoiceMemberSchema=mongoose.Schema({
    

    id_question: {
        type: String
    },
    id_answer: {
        type: String
    },
    id_test_member: {
        type: String
    }

})
var ChoiceMember=module.exports=mongoose.model('ChoiceMember', ChoiceMemberSchema);