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
    var member=JSON.parse(member);
    var pseudo=member.pseudo;
    var password=member.password;
  
        return new Promise((resolve, reject) => {
     
        var sql = "select * FROM member where pseudo=? and password=? "; 
        con.query(sql,[pseudo, password], function (err, members) {
          var membersList=JSON.stringify(members);
          membersList=JSON.parse(membersList);
          if (err) {
            memberDetails = {
                status: 500
            };
            reject(err);
        } else if (membersList[0]===undefined || (membersList[0].password!==password)) {
            memberDetails = {
                status: 403
            };
            reject(err);
        } else{
            memberDetails = {
                member:membersList[0],
                status: 200,
            }; 
            reject(err);
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

_publics.createChoiceMember = (choiceMember) => { 
    var choiceMember=JSON.parse(choiceMember);
    var id_question=choiceMember.id_question;
    var idAnswer=choiceMember.idAnswer;
    var idTestMember=choiceMember.idTestMember;
    
    
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "INSERT INTO choice_member SET ? ";
             const newChoiceMember = { id_question: id_question,id_answer:id_answer,idTestMember:idTestMember};
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

_publics.getMemberByClazz = (req) => { 
    var idClazz=req.query.id;
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM member where id_clazz=? "; 
                 con.query(sql,[idClazz], function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                });
     });    
  };

_publics.getTestMembers = (req) => { 
  var id_clazz=req.query.id_clazz;
  var id_school=req.query.id_school;
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM test where id_school = ? and id_clazz = ?"; 
             con.query(sql,[id_clazz,id_school], function (err, result) {
                 con.query(sql, function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
                });
     });    
 };
_publics.createTestMembers = (testMembers ) => { 
    var testMembers=JSON.parse(testMembers);
    var id_test=testMembers.id_test;
    var id_member=testMembers.id_member;
    
    
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "INSERT INTO test_members SET ? ";
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
_publics.getTestSubCategoryMembers = (req) => { 
    var id_test=req.query.id_test;
    var id_category=req.query.id_category;
      return new Promise((resolve, reject) => {  
               var sql = "select * FROM sub_category where id_test = ? order by (category_id) ?"; 
               con.query(sql,[id_test,id_category], function (err, result) {
                   con.query(sql, function (err, result) {
                   if (err) reject(err);
                   return resolve(JSON.stringify(result));
                   });
                  });
       });    
   };

_publics.updateTestMember=(req,testMembers) => { 
    var testMembers=JSON.parse(testMembers);
    var id_test=choiceMember.id_test;
    var id_member=choiceMember.id_member;
    
  
  
    var idTestMember=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg="";
             var sql = "UPDATE test_member SET id_test=?, id_member=?  WHERE id = ?"; 
             con.query(sql,[id_test,id_member,,id], function (err, result) {
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

_publics.getAllTestMembersByMember = (req) => { 
    var idMember=req.query.id;
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM test_member where id=?"; 
           
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