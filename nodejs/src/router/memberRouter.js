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
memberController.createChoiceMember(req)
.then(choiceMember=>{ 
    res.payload.choiceMember=choiceMember;
    return memberController.createChoiceMember(choiceMember)
})
.then(response=>{ 
    var idTestMember=response.idTestMember;
    if(response.msg==="success"){
        console.log(idTestMember);
        return idTestMember;
    }else{
        console.log("failure");
        return ("failure");
    } 
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

router.get('/getAllMembers',urlencodedParser, (req, res, next) => 
memberController.getAllChoiceMembers(req)
.then(members=>{
  res.send(members);
})
.catch(next));

router.post('/login',urlencodedParser, (req, res, next) => 
memberController.getRawBody(req)
.then(member=>{
    return memberController.login(member);
})
.then(response=>{
  res.send(response);
})
.catch(next));







module.exports = router;
