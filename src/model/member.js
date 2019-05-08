'use strict';


const mongoose=require('mongoose');


const MemberSchema=mongoose.Schema({

    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: String
    },
    pseudo: {
        type: String
    },
    password: {
        type: String
    },
    civility: {
        type: String
    },
    id_school: {
        type: String
    },
    idClass:{
        type: String
    }
})
var Member=module.exports=mongoose.model('Member', MemberSchema);