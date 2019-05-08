'use strict';

const _publics = {};
var config = require('../../config');
const dateFormat = require('dateformat');
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
    var idSchool=member.idSchool;
    var idClass=member.idClass;
    
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "INSERT INTO member SET ? ";
             const newMember = { firstname: firstname,lastname:lastname,email:email,age:age,pseudo:pseudo, password: password, civility: civility, idSchool:idSchool,idClass:idClass};
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

_publics.updateMember=(req,member) => { 
    var member=JSON.parse(member);
    var firstname=member.firstname;
    var lastname=member.lastname;
    var email=member.email;
    var age=member.age;
    var pseudo=member.pseudo;
    var password=member.password;
    var civility=member.civility;
    var idSchool=member.idSchool;
    var idClass=member.idClass;
  
  
    var id=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg="";
             var sql = "UPDATE member SET firstname=?, lastname=?, email=?, age=?, pseudo=?, password=?,civility=?,idSchool=?,idClass=?  WHERE id = ?"; 
             con.query(sql,[firstname,lastname,email,age,pseudo,password,civility,idSchool,idClass,id], function (err, result) {
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
    var idQuestion=choiceMember.idQuestion;
    var idAnswer=choiceMember.idAnswer;
    var idTestMember=choiceMember.idTestMember;
    
    
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "INSERT INTO choice_member SET ? ";
             const newChoiceMember = { idQuestion: idQuestion,idAnswer:idAnswer,idTestMember:idTestMember};
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
    var idQuestion=choiceMember.idQuestion;
    var idAnswer=choiceMember.idAnswer;
    var idTestMember=choiceMember.idTestMember;
    
  
  
    var id=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg="";
             var sql = "UPDATE choice_member SET idQuestion=?, idAnswer=?, idTestMember=?  WHERE id = ?"; 
             con.query(sql,[idQuestion,idAnswer,idTestMember,id], function (err, result) {
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
             var sql = "select * FROM member where clazz_id=? "; 
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
    var idTest=testMembers.idTest;
    var idMember=testMembers.idMember;
    
    
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "INSERT INTO test_members SET ? ";
             const newtestMembers = { idTest: idTest,idMember:idMember};
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
    var idTest=choiceMember.idTest;
    var idMember=choiceMember.idMember;
    
  
  
    var idTestMember=req.query.idTestMember;
    return new Promise((resolve, reject) => { 
             var msg="";
             var sql = "UPDATE test_member SET test_id=?, member_id=?  WHERE id = ?"; 
             con.query(sql,[idTest,idMember,,idTestMember], function (err, result) {
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
    var idTestMember=req.query.idTestMember;
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
    var idMember=req.query.idMember;
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM test_member where member_id=?"; 
           
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