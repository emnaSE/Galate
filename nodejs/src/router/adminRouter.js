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


router.post('/deleteClassById', (req, res, next) =>
adminController.deleteClazzById(req)

.then(msg=>{
    res.send(msg);
})
.catch(next));
router.post('/deleteClassByIdSchool', (req, res, next) =>
adminController.deleteClazzByIdSchool(req)

.then(msg=>{
    res.send(msg);
})
.catch(next));

  router.post('/createSchool',(req, res, next)=>
  memberController.getRawBody(req)
  .then(school=>{
      res.payload.school=school;
      return adminController.createSchool(school)
  })
  .then(msg=>{
      res.send(msg);
  })
  .catch(next));
  
router.post('/updateSchool', (req, res, next) =>
memberController.getRawBody(req)
.then(school=>{
    return adminController.updateSchool(req,school)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.post('/deleteSchool', (req, res, next) =>
adminController.deleteSchool(req)

.then(msg=>{
    res.send(msg);
})
.catch(next));



router.post('/createSubcategory',(req, res, next)=>
memberController.getRawBody(req)
.then(Subcategory=>{
    res.payload.Subcategory=Subcategory;
    return adminController.createSubCategory(Subcategory)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.post('/updateSubcategory', (req, res, next) =>
memberController.getRawBody(req)
.then(Subcategory=>{
  return adminController.updateSubCategory(req,Subcategory)
})
.then(msg=>{
  res.send(msg);
})
.catch(next));

router.post('/deleteSubcategory', (req, res, next) =>
adminController.deleteSubCategoryById(req)

.then(msg=>{
  res.send(msg);
})
.catch(next));

router.post('/deleteSubcategroies', (req, res, next) =>
adminController.deleteSubCategorysByIdCategory(req)

.then(msg=>{
  res.send(msg);
})
.catch(next));



module.exports = router;
