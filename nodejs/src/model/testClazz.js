'use strict';


const mongoose=require('mongoose');

const TestClazzSchema=mongoose.Schema({
    

    
    idClazz: {
        type : String
    },
    idTest: {
        type : String
    }
})
var TestClazz=module.exports=mongoose.model('TestClazz', TestClazzSchema);