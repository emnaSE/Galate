'use strict';


const mongoose=require('mongoose');


const ManuelAnswerSchema=mongoose.Schema({
    

    response: {
        type: String
    },
    id_test: {
        type: String
    },
    id_subcategory: {
        type: String
    },
    id_member: {
        type: String
    },
    result: {
        type: String
    },
    etallonage_result: {
        type: String
    }
})
var ManuelAnswer=module.exports=mongoose.model('ManuelAnswer', ManuelAnswerSchema);