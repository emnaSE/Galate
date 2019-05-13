'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var con=config.con;
var url=`http://localhost:3000`;

_publics.createMember = (member) => { 
    var member=JSON.parse(member);
    var firstname=member.firstname;
    var lastname=member.lastname;
    var email=member.email;
    var age=member.age;
    var pseudo=member.pseudo;
    var password=member.password;
    var civility=member.civility;
    var id_school=member.id_school;
    var id_clazz=member.id_clazz;
    
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "INSERT INTO member SET ? ";
             const newMember = { firstname: firstname,lastname:lastname,email:email,age:age,pseudo:pseudo, password: password, civility: civility,id_school:id_school,id_clazz:id_clazz};
             con.query(sql,newMember, function (err, result) {
                if (err){
                    msg="failure";
                    reject(err);
                  }else{
                    msg="success";
                  }
              return resolve(msg);
             });
    });   
  
        
  }; 
_publics.getRawBody = (req) => { 
    return new Promise((resolve, reject) => { 
            getRawBody(req, {
              length: req.headers['content-length'],
              limit: '1mb',
            }, function (err, string) {
              if (err) return next(err)
              req.text = string;
              return resolve(req.text);
            })
    });    
  };
_publics.updateMember=(req,member) => { 
    var member=JSON.parse(member);
    var firstname=member.firstname;
    var lastname=member.lastname;
    var email=member.email;
    var age=member.age;
    var pseudo=member.pseudo;
    var password=member.password;
    var civility=member.civility;
    var id_school=member.id_school;
    var id_clazz=member.id_clazz;
  
  
    var id=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg="";
             var sql = "UPDATE member SET firstname=?, lastname=?, email=?, age=?, pseudo=?, password=?,civility=?,id_school=?,id_clazz=?  WHERE id = ?"; 
             con.query(sql,[firstname,lastname,email,age,pseudo,password,civility,id_school,id_clazz,id], function (err, result) {
                if (err){
                    msg="failure";
                    reject(err);
                  }else{
                    msg="success";
                  }
              return resolve(msg);
             });
           });    
  };

_publics.deleteMember = (req) => { 
    var id=req.query.id;
   return new Promise((resolve, reject) => {  
            var sql = "DELETE FROM member WHERE id = ?"; 
            var msg="";
            con.query(sql,[id], function (err, result) {
              if (err){
                msg="failure";
                reject(err);
              }else{
                msg="success";
              }
             return resolve(msg);
            });
          });    
};

_publics.getAllMembers = (req) => { 
  
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM member"; 
           
                 con.query(sql, function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
     });    
 };

_publics.login = (member) => {
  
    var memberDetails={};
    var member0=JSON.parse(member);
    var pseudo=member0.pseudo;
    var password=member0.password;
  
        return new Promise((resolve, reject) => {
     
        var sql = "select * FROM member where pseudo=? and password=? "; 
        con.query(sql,[pseudo, password], function (err, members) {
          var members=JSON.stringify(members);
          members=JSON.parse(members);
         
          if (err) {
            memberDetails = {
                status: 500
            };
        } else if (members[0]===undefined || (members[0].password!==password)) {
            memberDetails = {
                status: 403
            };
        } else{
            memberDetails = {
                member:members[0],
                status: 200,
            }; 
        }
        return resolve(JSON.stringify(memberDetails));
        });          
       }); 
  };

_publics.getMemberById = (req) => { 
    var idMember=req.query.id;
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM member where id=?"; 
                 con.query(sql,[idMember], function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                });
     });    
  };

_publics.createChoiceMember = (choice_member) => { 
    var choice_member=JSON.parse(choice_member);
    var id_question=choice_member.id_question;
    var id_answer=choice_member.id_answer;
    var id_test_member=choice_member.id_test_member;
    
    
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "INSERT INTO choice_member SET ? ";
             const newChoiceMember = { id_question: id_question,id_answer:id_answer,id_test_member:id_test_member};
             con.query(sql,newChoiceMember, function (err, result) {
                if (err){
                    msg="failure";
                    reject(err);
                  }else{
                    msg="success";
                  }
              return resolve(msg);
             });
    });   
  
        
  }; 

_publics.updateChoiceMember=(req,choiceMember) => { 
    var choiceMember=JSON.parse(choiceMember);
    var id_question=choiceMember.id_question;
    var id_answer=choiceMember.id_answer;
    var id_test_member=choiceMember.id_test_member;
    
  
  
    var id=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg="";
             var sql = "UPDATE choice_member SET id_question=?, id_answer=?, id_test_member=?  WHERE id = ?"; 
             con.query(sql,[id_question,id_answer,id_test_member,id], function (err, result) {
                if (err){
                    msg="failure";
                    reject(err);
                  }else{
                    msg="success";
                  }
              return resolve(msg);
             });
           });    
  };

_publics.deleteChoiceMember = (req) => { 
    var id=req.query.id;
   return new Promise((resolve, reject) => {  
            var sql = "DELETE FROM choice_member WHERE id = ?"; 
            var msg="";
            con.query(sql,[id], function (err, result) {
              if (err){
                msg="failure";
                reject(err);
              }else{
                msg="success";
              }
             return resolve(msg);
            });
          });    
};

_publics.getAllChoiceMembers = (req) => { 
  
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM choice_member"; 
           
                 con.query(sql, function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
     });    
 };

_publics.getMemberByClass = (req) => { 
    var idClazz=req.query.idClazz;
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM member where id_clazz=? "; 
                 con.query(sql,[idClazz], function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                });
     });    
  };

_publics.getTestMembersByClassSchool = (req) => { 
  var id_clazz=req.query.id_clazz;
  var id_school=req.query.id_school;
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM member where id_school=? and  id_clazz=? "; 
             con.query(sql,[id_school,id_clazz], function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
                });
    
 };
_publics.createTestMembers = (testMembers ) => { 
    var testMembers=JSON.parse(testMembers);
    var id_test=testMembers.id_test;
    var id_member=testMembers.id_member;
    
    
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "INSERT INTO test_member SET ? ";
             const newtestMembers = { id_test: id_test,id_member:id_member};
             con.query(sql,newtestMembers, function (err, result) {
                if (err){
                    msg="failure";
                    reject(err);
                  }else{
                    msg="success";
                  }
              return resolve(msg);
             });
    });   
  
        
  }; 

_publics.updateTestMember=(req,testMember) => { 
    var testMember=JSON.parse(testMember);
    var id_test=testMember.id_test;
    var id_member=testMember.id_member;
    
  
  
    var idTestMember=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg="";
             var sql = "UPDATE test_member SET id_test=?, id_member=?  WHERE id = ?"; 
             con.query(sql,[id_test,id_member,idTestMember], function (err, result) {
                if (err){
                    msg="failure";
                    reject(err);
                  }else{
                    msg="success";
                  }
              return resolve(msg);
             });
           });    
  };

_publics.deleteTestMember = (req) => { 
    var idTestMember=req.query.id;
   return new Promise((resolve, reject) => {  
            var sql = "DELETE FROM test_member WHERE id = ?"; 
            var msg="";
            con.query(sql,[idTestMember], function (err, result) {
              if (err){
                msg="failure";
                reject(err);
              }else{
                msg="success";
              }
             return resolve(msg);
            });
          });    
};

_publics.getAllMemberTest = (req) => { 
    var idMember=req.query.idMember;
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM test_member where id_member=?"; 
           
                 con.query(sql,[idMember], function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
     });    
 };

_publics.getAllTestMembers = (req) => { 
  
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM test_member"; 
           
                 con.query(sql, function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
     });    
 };


module.exports = _publics;