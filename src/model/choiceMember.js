'use strict';


const mongoose=require('mongoose');


const ChoiceMemberSchema=mongoose.Schema({
    

    idQuestion: {
        type: String
    },
    idAnswer: {
        type: String
    },
    idTestMember: {
        type: String
    }

})
var ChoiceMember=module.exports=mongoose.model('ChoiceMember', ChoiceMemberSchema);