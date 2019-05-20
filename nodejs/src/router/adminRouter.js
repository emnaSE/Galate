'use strict';

const router = require('express').Router();
const adminController = require('../controller/adminController');
const memberController = require('../controller/memberController');
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
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
});



var getRawBody = require('raw-body')
router.use(bodyParser.urlencoded({ extended: true }));
router.get('/getAllCategories', urlencodedParser, (req, res, next) =>
    adminController.getAllCategories(req)
        .then(categories => {
            res.send(categories);
        })
        .catch(next));

router.get('/getCategoryById', urlencodedParser, (req, res, next) =>
    adminController.getCategoryById(req)
        .then(categories => {
            res.send(categories);
        })
        .catch(next));


router.post('/createCategory', (req, res, next) =>
    memberController.getRawBody(req)
        .then(category => {
            res.payload.category = category;
            return adminController.createCategory(category)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.post('/updateCategoryById', (req, res, next) =>
    memberController.getRawBody(req)
        .then(category => {
            return adminController.updateCategory(req, category)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.post('/deleteCategoryById', (req, res, next) =>
    adminController.deleteCategory(req)

        .then(msg => {
            res.send(msg);
        })
        .catch(next));

//class 

router.get('/getAllClasses', urlencodedParser, (req, res, next) =>
    adminController.getAllClasses(req)
        .then(classes => {
            res.send(classes);
        })
        .catch(next));

router.get('/getAllClassesBySchool', urlencodedParser, (req, res, next) =>
    adminController.getAllClassesByIdSchool(req)
        .then(classes => {
            res.send(classes);
        })
        .catch(next));
router.get('/getClassById', urlencodedParser, (req, res, next) =>
    adminController.getClassById(req)
        .then(classes => {
            res.send(classes);
        })
        .catch(next));

router.post('/createClass', (req, res, next) =>
    memberController.getRawBody(req)
        .then(clazz => {
            res.payload.clazz = clazz;
            return adminController.createClazz(clazz)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));



router.post('/updateClassById', (req, res, next) =>
    memberController.getRawBody(req)
        .then(clazz => {
            return adminController.updateClazz(req, clazz)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));


router.post('/deleteClassById', (req, res, next) =>
    adminController.deleteClazzById(req)

        .then(msg => {
            res.send(msg);
        })
        .catch(next));
router.post('/deleteClassByIdSchool', (req, res, next) =>
    adminController.deleteClazzByIdSchool(req)

        .then(msg => {
            res.send(msg);
        })
        .catch(next));
//school

router.get('/getSchoolById', urlencodedParser, (req, res, next) =>
    adminController.getSchoolById(req)
        .then(schools => {
            res.send(schools);
        })
        .catch(next));
router.get('/getAllSchools', urlencodedParser, (req, res, next) =>
    adminController.getAllSchools(req)
        .then(schools => {
            res.send(schools);
        })
        .catch(next));

router.post('/createSchool', (req, res, next) =>
    memberController.getRawBody(req)
        .then(school => {
            return adminController.createSchool(school)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.post('/updateSchoolById', (req, res, next) =>
    memberController.getRawBody(req)
        .then(school => {
            return adminController.updateSchool(req, school)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.post('/deleteSchoolById', (req, res, next) =>
    adminController.deleteSchool(req)

        .then(msg => {
            res.send(msg);
        })
        .catch(next));

//subcategory
router.get('/getAllSubcategories', urlencodedParser, (req, res, next) =>
    adminController.getAllSubcategories(req)
        .then(subcategories => {
            res.send(subcategories);
        })
        .catch(next));
router.get('/getSubcategoryById', urlencodedParser, (req, res, next) =>
    adminController.getSubcategoryById(req)
        .then(subcategories => {
            res.send(subcategories);
        })
        .catch(next));

router.get('/getAllSubcategoriesByCategory', urlencodedParser, (req, res, next) =>
    adminController.getAllSubcategoriesByCategory(req)
        .then(subcategories => {
            res.send(subcategories);
        })
        .catch(next));
router.get('/getAllSubcategoriesByTestId', urlencodedParser, (req, res, next) =>
    adminController.getAllSubcategoriesByIdTest(req)
        .then(subcategories => {
            res.send(subcategories);
        })
        .catch(next));

router.post('/createSubcategory', (req, res, next) =>
    memberController.getRawBody(req)
        .then(Subcategory => {
            res.payload.Subcategory = Subcategory;
            return adminController.createSubCategory(Subcategory)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.post('/updateSubcategoryById', (req, res, next) =>
    memberController.getRawBody(req)
        .then(Subcategory => {
            return adminController.updateSubCategory(req, Subcategory)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.post('/deleteSubcategoryById', (req, res, next) =>
    adminController.deleteSubCategoryById(req)

        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.post('/deleteSubcategroies', (req, res, next) =>
    adminController.deleteSubCategorysByIdCategory(req)

        .then(msg => {
            res.send(msg);
        })
        .catch(next));

//question

router.post('/createQuestion', (req, res, next) =>
    adminController.getRawBody(req)
        .then(question => {
            res.payload.question = question;
            return adminController.createQuestion(question)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));


router.post('/updateQuestionById', (req, res, next) =>
    adminController.getRawBody(req)
        .then(question => {
            return adminController.updateQuestion(req, question)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.get('/deleteQuestionById', urlencodedParser, (req, res, next) =>
    adminController.deleteQuestion(req)
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.get('/getAllQuestion', urlencodedParser, (req, res, next) =>
    adminController.getAllQuestion(req)
        .then(questions => {
            res.send(questions);
        })
        .catch(next));

router.get('/getAllQuestionsByIdSubcategory', urlencodedParser, (req, res, next) =>
    adminController.getAllQuestionsByIdSubcategory(req)
        .then(questions => {
           
            res.payload.questions=questions;
            res.send(questions);

            return adminController.getAllAnswersByQuestions(req,questions,res);
        })
        .then(answers => {
            res.payload.answers=answers;
            
         //console.log( res.payload);
          //res.send(res.payload);
          return res.payload;
        })
        .catch(next));



router.get('/getQuestionById', urlencodedParser, (req, res, next) =>
    adminController.getQuestionById(req)
        .then(question => {
            res.send(question);
        })
        .catch(next));

//Answer

router.post('/createAnswer', (req, res, next) =>
    adminController.getRawBody(req)
        .then(answer => {
            res.payload.answer = answer;
            return adminController.createAnswer(answer)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));


router.post('/updateAnswerById', (req, res, next) =>
    adminController.getRawBody(req)
        .then(answer => {
            return adminController.updateAnswer(req, answer)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.get('/deleteAnswerById', urlencodedParser, (req, res, next) =>
    adminController.deleteAnswer(req)
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.get('/getAllAnswerByQuestionId', urlencodedParser, (req, res, next) =>
    adminController.getAllAnswerByQuestion(req)
        .then(answers => {
            res.answers=answers;
            res.send(answers);
        })
        .catch(next));

router.get('/getAnswerById', urlencodedParser, (req, res, next) =>
    adminController.getAnswerById(req)
        .then(answer => {
            res.send(answer);
        })
        .catch(next));

router.post('/createAnswer',(req, res, next)=>
adminController.getRawBody(req)
.then(answer=>{
    res.payload.answer=answer;
    return adminController.createAnswer(answer)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.post('/createQuestionAndAnswers',(req, res, next)=>
adminController.getRawBody(req)
.then(response=>{
    var question=JSON.parse(response).question;
    res.payload.answers=JSON.parse(response).answers;
    return adminController.createNewQuestion(question)
})
.then(message=>{
    if(message.msg==="success"){
        return adminController.createAnswers(message.questionId, res.payload.answers);
    }else{
        return "failure";
    }
})
.then(msg=>{
    res.send(msg);
})
.catch(next));



router.post('/updateAnswerById',(req, res, next)=>
adminController.getRawBody(req)
.then(answer=>{
    return adminController.updateAnswer(req,answer)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.get('/deleteAnswerById',urlencodedParser, (req, res, next) => 
adminController.deleteAnswer(req)
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.get('/getAllAnswerByQuestion',urlencodedParser, (req, res, next) => 
adminController.getAllAnswerByQuestion(req)
.then(answers=>{
  res.send(answers);
})
.catch(next));

router.get('/getAnswerById',urlencodedParser, (req, res, next) => 
 adminController.getAnswerById(req)
.then(answer=>{
  res.send(answer);
})
.catch(next));


//Test 



router.get('/getAllTests', urlencodedParser, (req, res, next) =>
    adminController.getAllTests(req)
        .then(tests => {
            res.send(tests);
        })
        .catch(next));

router.get('/getTestById', urlencodedParser, (req, res, next) =>
    adminController.getTestById(req)
        .then(tests => {
            res.send(tests);
        })
        .catch(next));


router.get('/getAllActivatedTests', urlencodedParser, (req, res, next) =>
    adminController.getAllActiveTests(req)
        .then(tests => {
            res.send(tests);
        })
        .catch(next));


router.get('/getAllDisabledTests', urlencodedParser, (req, res, next) =>
    adminController.getAllDisabledTests(req)
        .then(tests => {
            res.send(tests);
        })
        .catch(next));

router.post('/createTest', (req, res, next) =>
    memberController.getRawBody(req)
        .then(test => {
            res.payload.test = test;
            return adminController.createTest(test)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.post('/updateTestById', (req, res, next) =>
    memberController.getRawBody(req)
        .then(test => {
            //console.log(test);

            return adminController.updateTest(req, test)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.get('/getAllTests',urlencodedParser, (req, res, next) => 
adminController.getAllTests(req)
.then(tests=>{
  res.send(tests);
})
.catch(next));

router.get('/getAllTestsById',urlencodedParser, (req, res, next) => 
adminController.getTestById(req)
.then(tests=>{
  res.send(tests);
})
.catch(next));


router.get('/getAllActivatedTests',urlencodedParser, (req, res, next) => 
adminController.getAllActiveTests(req)
.then(tests=>{
  res.send(tests);
})
.catch(next));


router.get('/getAllDisabledTests',urlencodedParser, (req, res, next) => 
adminController.getAllDisabledTests(req)
.then(tests=>{
  res.send(tests);
})
.catch(next));

router.post('/createTest',(req, res, next)=>
memberController.getRawBody(req)
.then(test=>{
    res.payload.test=test;
    return adminController.createTest(test)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.post('/updateTestById',(req, res, next)=>
memberController.getRawBody(req)
.then(test=>{
    //console.log(test);

    return adminController.updateTest(req,test)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));


router.post('/deleteTestById', (req, res, next) =>
    adminController.deleteTest(req)

        .then(msg => {
            res.send(msg);
        })
        .catch(next));



router.post('/affectCategoriesToTest', (req, res, next) => adminController.
    getRawBody(req)
    .then(affectation => {
        var affectation = JSON.parse(affectation);
        var testId = req.query.testId;
        res.payload.testId = testId;
        res.payload.categoriesList = affectation.categories;
        return adminController.RemoveAffectationCategoriesToTest(testId, affectation.categories);
    })
    .then(response => {
        return adminController.AffectCategoriesToTest(res.payload.testId, res.payload.categoriesList);
    })
    .then(response => {
        res.send(response);
    })
    .catch(next));


router.post('/affectSubcategoriesToTest', (req, res, next) => adminController.

    getRawBody(req)
    .then(affectation => {
        var affectation = JSON.parse(affectation);
        var testId = req.query.testId;
        res.payload.testId = testId;
        res.payload.subcategoriesList = affectation.subcategories;
        res.payload.questionsNumber = affectation.questionsNumber;
        res.payload.wording = affectation.wording;
        return adminController.RemoveAffectationSubcategoriesToTest(testId, affectation.subcategories);
    })
    .then(response => {
        return adminController.AffectSubcategoriesToTest(res.payload.testId, res.payload.subcategoriesList, res.payload.questionsNumber, res.payload.wording);
    })
    .then(response => {
        res.send(response);
    })
    .catch(next));


router.post('/duplicateTest', (req, res, next) =>
    memberController.getRawBody(req)
        .then(test => {
            res.payload.test = test;
            return adminController.duplicateTest(test)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));



//duplicate test

router.post('/getFirstTest',(req, res, next)=>
adminController.getFirstTest()
.then(tests=>{
    res.payload.test=tests[0];
    return adminController.getTestCategoryByTestId(tests[0].id)
})
.then(testCategories=>{
    res.payload.testCategories=testCategories;
    return adminController.getTestSubcategoryByTestId(res.payload.test.id)
})
.then(testSubcategories=>{
    res.payload.testSubcategories=testSubcategories;
    return adminController.getQuestionsByTestSubcategories(testSubcategories)
})
.then(questions=>{
    return adminController.getNotEmptyQuestions(questions);
})
.then(questionArray=>{
    res.payload.questions=questionArray;
    return adminController.getAnswersByQuestions(questionArray)
})
.then(answers=>{
    return adminController.getNotEmptyAnswres(answers);
})
.then(answerArray=>{
    res.payload.answers=answerArray;
    return res.payload
})
.then(response=>{
   // res.send(response);
    //console.log("test "+res.payload.test);
    //res.payload.test=test[0];
    return adminController.duplicateTest(res.payload.test)
})
.then(testId=>{
    // res.send(response);
     //console.log("test "+res.payload.test);
     //res.payload.test=test[0];
     return adminController.duplicateTestCategory(testId,res.payload.testCategories)
 })
.catch(next));




//test by class member date
router.get('/getTestClassDateMember', urlencodedParser, (req, res, next) =>
    adminController.getTestClassDateMember(req)
        .then(tests => {
            res.send(tests);
        })
        .catch(next));

//test fait 


router.get('/getTestFait',urlencodedParser, (req, res, next) => 
adminController.getTestFait(req)
.then(tests=>{
  res.send(tests);
})
.catch(next));


router.post('/login', (req, res, next) => 
adminController.getRawBody(req)
.then(admin=>{
    return adminController.login(admin);
})
.then(response=>{
  res.send(response);
})
.catch(next));














module.exports = router;


