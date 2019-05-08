'use strict';


const mongoose=require('mongoose');


const EtalonnageSchema=mongoose.Schema({
    

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
var Etalonnage=module.exports=mongoose.model('Etalonnage', EtalonnageSchema);