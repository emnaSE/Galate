'use strict';


const mongoose=require('mongoose');

const TestMemberSchema=mongoose.Schema({
    

    idTest: {
        type: String
    },
    idMember: {
        type: Number
    },
    
})
var TestMember=module.exports=mongoose.model('TestMember', TestMemberSchema);