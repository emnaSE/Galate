'use strict';


const mongoose=require('mongoose');


const AdminSchema=mongoose.Schema({
    

    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    pseudo: {
        type: String
    },
    password: {
        type: String
    }
})
var Admin=module.exports=mongoose.model('Admin', AdminSchema);