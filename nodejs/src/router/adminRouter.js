'use strict';

const router = require('express').Router();
const adminController=require('../controller/adminController');

const bodyParser = require('body-parser');

var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
  };
var urlencodedParser=bodyParser.urlencoded({extended : false});

var getRawBody = require('raw-body');



router.use(bodyParser.raw(options));
router.use((req, res, next) => {
    res.payload = {};
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });


router.use(bodyParser.urlencoded({extended : true}));

router.post('/createCategory',(req, res, next)=>
adminController.getRawBody(req)
.then(category=>{ 
    console.log('ggggg');
    res.payload.category=category;
    return adminController.createCategory(category);
})
/*.then(response=>{ 
    var name=response.name;
    var subCategoriesNumber=response.subCategoriesNumber;
    if(response.msg==="success"){
        console.log(name);
        return name;
    }else{
        console.log("failure");
        return ("failure");
    } 
})*/
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.get('/category/update', (req, res, next) =>
    adminController.updateCategory()
        .then(response => {
            
            res.send(response);
        })
        .catch(next));









module.exports = router;
