'use strict';

const router = require('express').Router();
const calculController = require('../controller/calculController');
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
//etalonnage 
router.post('/createEtalonnage', (req, res, next) =>
    memberController.getRawBody(req)
        .then(etalonnage => {
            return calculController.createEtalonnage(etalonnage)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));


router.post('/updateEtalonnage', (req, res, next) =>
    memberController.getRawBody(req)
        .then(etalonnage => {
            return calculController.updateEtalonnage(req, etalonnage)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.get('/deleteEtalonnage', urlencodedParser, (req, res, next) =>
    calculController.deleteEtalonnage(req)
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.get('/getAllEtalonnages', urlencodedParser, (req, res, next) =>
    calculController.getAllEtalonnages(req)
        .then(etalonnages => {
            res.send(etalonnages);
        })
        .catch(next));
router.get('/getEtalonnageById', urlencodedParser, (req, res, next) =>
    calculController.getEtalonnageById(req)
        .then(etalonnage => {
            var etalonnageObj=JSON.parse(etalonnage).length===0 ? undefined : JSON.parse(etalonnage)[0];
            res.send(etalonnageObj);
        })
        .catch(next));



/*router.post('/saveTestResult', urlencodedParser, (req, res, next) =>calculController
.getLineSum(req)
.then(sumLines => {
    return calculController.createListOfManuelAnswers(req, sumLines);
})
.then(message => {
    res.send(message);
})
.catch(next));*/
router.post('/saveTestResult',(req, res, next)=>memberController
.getRawBody(req)
.then(choices=>{
    res.payload.choices=choices;
    req.query.idMember=req.query.id_member;
    req.query.idTest=req.query.id_test;
    return memberController.getTestMemberByMemberIdAndTestId(req);
})
.then(testMember=>{
    var test_member=JSON.parse(testMember);
    return memberController.deleteMemberChoicesByIdTestMember(test_member.id);
})
.then(message=>{
    return memberController.deleteManuelAnswersByTestMember(req);
})
.then(response=>{
    return memberController.createMemberChoices(res.payload.choices);
})
.then(response=>{
    if(response==="failure"){
        res.payload.leave=true;
        return;
    }
    return calculController.getLineSum(req);
})
.then(sumLines => {
    if(res.payload.leave===true){
        return "failure";
    }
    return calculController.createListOfManuelAnswers(req, sumLines);
})
.then(message => {
    res.send(message);
})
.catch(next));


router.get('/getEtalonnageValue', urlencodedParser, (req, res, next) =>
    calculController.getEtalonnageValue(req)
        .then(value => {
            calculController.setEtalonnageValue(req, value);
        }).then(response => {
            res.send(response);
        })
        .catch(next));


router.get('/getEtalonnageResults', urlencodedParser, (req, res, next) =>
    calculController.getEtalonnageResults(req)
        .then(response => {
            res.send(response);
        })
        .catch(next));


router.get('/getCategoryNameByMemberIdAndTestId', urlencodedParser, (req, res, next) =>
    calculController.getCategoryNameByMemberIdAndTestId(req)
        .then(response => {
            res.send(response);
        })
        .catch(next));
router.get('/getEtalonnageDetails', urlencodedParser, (req, res, next) =>
    calculController.getEtalonnageDetails(req)
        .then(response => {
            res.send(response);
        })
        .catch(next));

router.get('/getAllCatrogiesByTestMember', urlencodedParser, (req, res, next) =>
calculController.getCategoryNameByMemberIdAndTestId(req)
.then(categories => {
    return adminController.getAllSubcategoriesByCategories(categories)
})
.then(response=>{
    res.payload.categories=response;
    return res.payload;
})
.then(response=>{
    console.log(response);
    res.send(response);
})
.catch(next));

router.get('/getSubcategoriesByCategory', urlencodedParser, (req, res, next) =>
    adminController.getCategoryById(req)
.then(category => {
    if(category===undefined){
        res.payload.leave=true;
        return;
    }
    res.payload.categoryName=JSON.parse(category).name;
    req.query.idCategory=JSON.parse(category).id;
    return adminController.getAllSubcategoriesByCategory(req);
})
.then(subcategories=>{
    if(res.payload.leave===true){
        return;
    }
    res.payload.subcategories=JSON.parse(subcategories);
    return  res.payload;
})
.then(resonse=>{
    res.send(res.payload);
})
.catch(next));



router.post('/updateManualAnswer', (req, res, next) =>
    calculController.updateManualAnswer(req)
.then(msg => {
    res.send(msg);
})
.catch(next));




module.exports = router;