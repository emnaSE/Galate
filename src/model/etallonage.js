'use strict';


const mongoose=require('mongoose');


const EtallonageSchema=mongoose.Schema({
    

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
var Etallonage=module.exports=mongoose.model('Etallonage', EtallonageSchema);