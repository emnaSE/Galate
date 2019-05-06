'use strict';


const mongoose=require('mongoose');

const TestCategorySchema=mongoose.Schema({
    

  
    idCategory: {
        type: String
    },
    idTest: {
        type: String
    }
})
var TestCategory=module.exports=mongoose.model('TestCategory', TestCategorySchema);