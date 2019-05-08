'use strict';


const mongoose=require('mongoose');

const TestSchoolSchema=mongoose.Schema({
    

    
    idSchool: {
        type : String
    },
    idTest: {
        type : String
    }
})
var TestSchool=module.exports=mongoose.model('TestSchool', TestSchoolSchema);