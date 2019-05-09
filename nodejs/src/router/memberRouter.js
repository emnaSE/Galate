'use strict';

const router = require('express').Router();
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

router.post('/createMember',(req, res, next)=>
memberController.getRawBody(req)
.then(member=>{
    res.payload.member=member;
    return memberController.createMember(member)
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





module.exports = router;
