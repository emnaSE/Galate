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
             var sql = "INSERT INTO user SET ? ";
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
            con.query(sql,[ref], function (err, result) {
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
     
        var sql = "select * FROM user where pseudo=? and password=? "; 
        con.query(sql,[pseudo, password], function (err, members) {
          var membersList=JSON.stringify(members);
          membersList=JSON.parse(membersList);
          if (err) {
            memberDetails = {
                status: 500
            };
        } else if (membersList[0]===undefined || (membersList[0].password!==password)) {
            memberDetails = {
                status: 403
            };
        } else{
            memberDetails = {
                member:membersList[0],
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


module.exports = _publics;