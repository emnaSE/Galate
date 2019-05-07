'use strict';


const mongoose=require('mongoose');

const TestMemberSchema=mongoose.Schema({
    

    name: {
        type: String
    },
    stepsNumber: {
        type: Number
    },
    password: {
        type: String
    },
    activationDate: {
        type: Date
    },
    expirationDate :{
        type : Date
    }
})
var TestMember=module.exports=mongoose.model('TestMember', TestMemberSchema);