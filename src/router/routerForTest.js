'use strict';

const router = require('express').Router();
router.use((req, res, next) => {
  res.payload = {};
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
router.use((req, res, next) => {
  res.payload = {};
  next();
});

var testController=require('../controller/controllerForTest');


router.get('/test', (req, res, next) => testController
.test(req)
.then(response => {
  res.send(response);
})
.catch(next));

router.get('/getAllTests', (req, res, next) => testController
.getAllTests()
.then(response => {
 res.send([{"id":"1","name":"test1" },{"id":"2","name":"test2" },{"id":"3","name":"test3" },{"id":"4","name":"test4" },{"id":"5","name":"test5" }]);
})
.catch(next));

router.get('/getAllCategories', (req, res, next) => testController
.getAllCategories()
.then(response => {
 res.send([{"id":"1","name":"categ1","subCategoriesNumber":2 },{"id":"2","name":"categ2", "subCategoriesNumber":4},{"id":"3","name":"categ3","subCategoriesNumber":2 },{"id":"4","name":"categ4","subCategoriesNumber":2 },{"id":"5","name":"categ5","subCategoriesNumber":3 }]);
})
.catch(next));

router.get('/getCategoriesByTestId', (req, res, next) => testController
.getCategoriesByTestId(req)
.then(response => {
 res.send([{"id":"1","name":"categ1","subCategoriesNumber":2 },{"id":"2","name":"categ2", "subCategoriesNumber":4},{"id":"3","name":"categ3","subCategoriesNumber":2 }]);
})
.catch(next));

router.get('/getSubCategoriesByTestId', (req, res, next) => testController
.getSubCategoriesByTestId(req)
.then(response => {
  res.send([{"id":"1","name":"categ1" },{"id":"2","name":"categ2" },{"id":"3","name":"categ3" },{"id":"4","name":"categ4" },{"id":"5","name":"categ5" }]);
})
.catch(next));

router.get('/getQuestionsByTestId', (req, res, next) => testController
.getQuestionsByTestId(req)
.then(response => {
  res.send([{"id":"1","name":"quest" },{"id":"2","name":"quest" },{"id":"3","name":"quest" },{"id":"4","name":"quest" },{"id":"5","name":"quest" }]);
})
.catch(next));

router.get('/getQuestionsBySubCategory', (req, res, next) => testController
.getQuestionsBySubCategory(req)
.then(response => {
  res.send([{"name":"question1","value":"10" ,"wording":"vous acceptez de vivre seul?" },{"name":"question2","value":"8" ,"wording":"la vie en rose?" },{"name":"question3","value":"15" ,"wording":"vous aimez le travail?" }]);
})
.catch(next));

router.get('/getQuestionsByCategory', (req, res, next) => testController
.getQuestionsByCategory(req)
.then(response => {
  res.send([{"subCategory":"subCat1","questionsList":[{"name":"question1","value":"10" ,"wording":"vous acceptez de vivre seul?" },{"name":"question2","value":"8" ,"wording":"la vie en rose?" },{"name":"question3","value":"15" ,"wording":"vous aimez le travail?" }]},{"subCategory":"subCat3","questionsList":[{"name":"question1","value":"10" ,"wording":"vous acceptez de vivre seul?" },{"name":"question2","value":"8" ,"wording":"la vie en rose?" },{"name":"question3","value":"15" ,"wording":"vous aimez le travail?" }]},{"subCategory":"subCat1","questionsList":[{"name":"question1","value":"10" ,"wording":"vous acceptez de vivre seul?" },{"name":"question2","value":"8" ,"wording":"la vie en rose?" },{"name":"question3","value":"15" ,"wording":"vous aimez le travail?" }]}]);
})
.catch(next));

router.get('/getQuestionsByTest', (req, res, next) => testController
.getQuestionsByTest(req)
.then(response => {
  res.send([{"category":"categ1","questionsList":[{"subCategory":"subCat1","questionsList":[{"name":"question1","value":"10" ,"wording":"vous acceptez de vivre seul?" },{"name":"question2","value":"8" ,"wording":"la vie en rose?" },{"name":"question3","value":"15" ,"wording":"vous aimez le travail?" }]},{"subCategory":"subCat3","questionsList":[{"name":"question1","value":"10" ,"wording":"vous acceptez de vivre seul?" },{"name":"question2","value":"8" ,"wording":"la vie en rose?" },{"name":"question3","value":"15" ,"wording":"vous aimez le travail?" }]},{"subCategory":"subCat1","questionsList":[{"name":"question1","value":"10" ,"wording":"vous acceptez de vivre seul?" },{"name":"question2","value":"8" ,"wording":"la vie en rose?" },{"name":"question3","value":"15" ,"wording":"vous aimez le travail?" }]}]},{"category":"categ1","questionsList":[{"subCategory":"subCat2","questionsList":[{"name":"question1","value":"10" ,"wording":"vous acceptez de vivre seul?" },{"name":"question2","value":"8" ,"wording":"la vie en rose?" },{"name":"question3","value":"15" ,"wording":"vous aimez le travail?" }]},{"subCategory":"subCat3","questionsList":[{"name":"question1","value":"10" ,"wording":"vous acceptez de vivre seul?" },{"name":"question2","value":"8" ,"wording":"la vie en rose?" },{"name":"question3","value":"15" ,"wording":"vous aimez le travail?" }]},{"subCategory":"subCat1","questionsList":[{"name":"question1","value":"10" ,"wording":"vous acceptez de vivre seul?" },{"name":"question2","value":"8" ,"wording":"la vie en rose?" },{"name":"question3","value":"15" ,"wording":"vous aimez le travail?" }]}]}]);
})
.catch(next));



















router.post('/createTest', (req, res, next) => testController
.createTest(req)
.then(response => {
  res.send(response);
})
.catch(next));

router.post('/createCategory', (req, res, next) => testController
.createCategory(req)
.then(response => {
  res.send(response);
})
.catch(next));

router.post('/createSubCategory', (req, res, next) => testController
.createSubCategory(req)
.then(response => {
  res.send(response);
})
.catch(next));


router.post('/createQuestion', (req, res, next) => testController
.createQuestion(req)
.then(response => {
  res.send(response);
})
.catch(next));


router.post('/createSchool', (req, res, next) => testController
.createSchool(req)
.then(response => {
  res.send(response);
})
.catch(next));


router.post('/createClazz', (req, res, next) => testController
.createClazz(req)
.then(response => {
  res.send(response);
})
.catch(next));



router.post('/createEtalonnage', (req, res, next) => testController
.createEtalonnage(req)
.then(response => {
  res.send(response);
})
.catch(next));













  /**
 * Last route, handles not found.
 */
router.use((req, res) => {
if (req.xhr)
  return res.status(404).json({
    message: 'Could not find the resource you were looking for',
  });
return res.status(404).render('not-found');
});

module.exports = router;
