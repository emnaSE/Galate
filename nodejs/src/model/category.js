'use strict';


const mongoose=require('mongoose');

const CategorySchema=mongoose.Schema({
    

    name: {
        type: String
    },
    subCategoriesNumber:{
        type: Number
    }
})
var Category=module.exports=mongoose.model('Category', CategorySchema);