'use strict';

const router = require('express').Router();
const memberController=require('../controller/memberController');
const adminController=require('../controller/adminController');

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
router.use(bodyParser.urlencoded({extended : true}));

router.post('/createChoiceMember',(req, res, next)=>
memberController.getRawBody(req)
.then(ChoiceMember=>{
    res.payload.choice_member=ChoiceMember;
    return memberController.createChoiceMember(ChoiceMember)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.post('/createMemberChoices',(req, res, next)=>memberController
.getRawBody(req)
.then(response=>{
    return memberController.createMemberChoices(response)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));


router.post('/register',(req, res, next)=>
memberController.getRawBody(req)
.then(member=>{
    res.payload.member=member;
    return memberController.register(member)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));


router.post('/updateMember',(req, res, next)=>
memberController.getRawBody(req)
.then(member=>{
    return memberController.updateMember(req,member)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.get('/deleteMember',urlencodedParser, (req, res, next) => 
memberController.deleteMember(req)
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.get('/getAllChoiceMembers',urlencodedParser, (req, res, next) => 
memberController.getAllChoiceMembers(req)
.then(members=>{
  res.send(members);
})
.catch(next));

router.post('/login', (req, res, next) => 
memberController.getRawBody(req)
.then(member=>{
    return memberController.login(member);
})
.then(response=>{
  res.send(response);
})
.catch(next));

router.get('/getAllMembers',urlencodedParser, (req, res, next) => 
memberController.getAllMembers(req)
.then(members=>{
  res.send(members);
})
.catch(next));

router.post('/updateChoiceMember',(req, res, next)=>
memberController.getRawBody(req)
.then(member=>{
    return memberController.updateChoiceMember(req,member)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.get('/deleteChoiceMember',urlencodedParser, (req, res, next) => 
memberController.deleteChoiceMember(req)
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.get('/getMemberById',urlencodedParser, (req, res, next) => 
memberController.getMemberById(req)
.then(member=>{
  res.send(member);
})
.catch(next));

router.get('/getMemberByClass',urlencodedParser, (req, res, next) => 
memberController.getMemberByClass(req)
.then(members=>{
  res.send(members);
})
.catch(next));

router.post('/createTestMember',(req, res, next)=>
memberController.getRawBody(req)
.then(testMember=>{
    var testMember=JSON.parse(testMember);
    var testId =testMember.testId;
    var memberId=testMember.memberId;
    return memberController.createTestMember(testId,memberId)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));


router.post('/updateTestMember',(req, res, next)=>
memberController.getRawBody(req)
.then(test_member=>{
    return memberController.updateTestMember(req,test_member)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.get('/deleteTestMember',urlencodedParser, (req, res, next) => 
memberController.deleteTestMember(req)
.then(msg=>{
    res.send(msg);
})
.catch(next));

router.get('/getMemberByClazzSchool',urlencodedParser, (req, res, next) => 
memberController.getTestMembersByClassSchool(req)
.then(members=>{
  res.send(members);
})
.catch(next));

router.get('/getMemberTest',urlencodedParser, (req, res, next) => 
memberController.getAllMemberTest(req)
.then(tests=>{
  res.send(tests);
})
.catch(next));
router.get('/getTestMemberByMemberIdAndTestId',urlencodedParser, (req, res, next) => 
memberController.getTestMemberByMemberIdAndTestId(req)
.then(testMember=>{
  res.send(testMember);
})
.catch(next));

router.post('/updateManuelAnswer',(req, res, next)=>
memberController.getRawBody(req)
.then(manuelAnswer=>{
    return memberController.updateManuelAnswer(req,manuelAnswer)
})
.then(msg=>{
    res.send(msg);
})
.catch(next));



router.post('/verifPasswordTest', (req, res, next) => 
memberController.getRawBody(req)
.then(test=>{
    return memberController.verifPasswordTest(test);
})
.then(response=>{
  res.send(response);
})
.catch(next));


//test fait 
router.get('/getTestEnCours',urlencodedParser, (req, res, next) => 
memberController.getTestEnCours(req)
.then(tests=>{
  res.send(tests);
})
.catch(next));


router.post('/loginForTest', (req, res, next) => 
memberController.getRawBody(req)
.then(password=>{
    return memberController.loginForTest(req.query.testId,password);
})
.then(test=>{
    res.payload.test=test;
    return memberController.createTestMember(req.query.testId,req.query.memberId);
})
.then(response=>{
  res.send(res.payload.test);
})
.catch(next));;








module.exports = router;
