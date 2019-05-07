'use strict';


const mongoose=require('mongoose');

const TestSchema=mongoose.Schema({
    

    name: {
        type: String
    },
    testSubcategoriesNumber: {
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
var Test=module.exports=mongoose.model('Test', TestSchema);