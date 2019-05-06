'use strict';


const mongoose=require('mongoose');

const SchoolSchema=mongoose.Schema({
    

    name: {
        type: String
    }
})
var School=module.exports=mongoose.model('School', SchoolSchema);