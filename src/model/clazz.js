'use strict';


const mongoose=require('mongoose');

const ClazzSchema=mongoose.Schema({
    

    name: {
        type: String
    },
    idSchool: {
        type : String
    }
})
var Clazz=module.exports=mongoose.model('Clazz', ClazzSchema);