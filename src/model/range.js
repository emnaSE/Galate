'use strict';


const mongoose=require('mongoose');


const RangeSchema=mongoose.Schema({
    

    lowerBound: {
        type: String
    },
    upperBound: {
        type: String
    },
    value: {
        type: String
    },
    idSubCategory: {
        type: String
    }
})
var Range=module.exports=mongoose.model('Range', RangeSchema);