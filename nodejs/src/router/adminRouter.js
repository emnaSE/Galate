'use strict';

const router = require('express').Router();
const adminController=require('../controller/adminController');
const memberController=require('../controller/memberController');
var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
  };
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.raw(options));
router.use((req, res, next) => {
    res.payload = {};
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });



var getRawBody = require('raw-body')
router.use(bodyParser.urlencoded({extended : true}));

  router.post('/createCategory',(req, res, next)=>
  memberController.getRawBody(req)
  .then(category=>{
      res.payload.category=category;
      return adminController.createCategory(category)
  })
  .then(msg=>{
      res.send(msg);
  })
  .catch(next));
  
router.post('/updateCategory', (req, res, next) =>
memberController.getRawBody(req)
.then(category=>{
    return adminController.updateCategory(req,category)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.post('/deleteCategory', (req, res, next) =>
adminController.deleteCategory(req)

.then(msg=>{
    res.send(msg);
})
.catch(next));


router.post('/createClass',(req, res, next)=>
memberController.getRawBody(req)
.then(clazz=>{
    res.payload.clazz=clazz;
    return adminController.createClazz(clazz)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));



router.post('/updateClass', (req, res, next) =>
memberController.getRawBody(req)
.then(clazz=>{
    return adminController.updateClazz(req,clazz)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));




module.exports = router;
