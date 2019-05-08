
'use strict';

const _publics = {};
var config = require('../config');
var con=config.con;
var url=`http://localhost:3001`;
var URL = require('url').URL;
const path = require('path');
var getRawBody = require('raw-body')



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


_publics.createTest = (test) => {
  var test0=JSON.parse(test);
  var name=test0.name;
    return new Promise((resolve, reject) => { 
     var msg="";
           var sql = "INSERT INTO school SET ? ";
           const test0 = { name: name};
           con.query(sql,test0, function (err, response) {
              if (err){
                  console.log("error");
                }else{
                  console.log("success");
                }
            
            return resolve("ok");
        });
   });  
}


_publics.test = () => {
    return new Promise((resolve, reject) => {  
        var sql = "select * FROM category"; 
              con.query(sql, function (err, result) {
              if (err) reject(err);
              return resolve(JSON.stringify(result));
              }); 
   });  
  
}

_publics.getAllTests = () => {
    return new Promise((resolve, reject) => {   
     resolve("ok");  
   });  
  
}
_publics.getAllCategories = () => {
    return new Promise((resolve, reject) => {  
     resolve("ok");  
   });  
  
}
_publics.getCategoriesByTestId = (req) => {
    var testId=req.testId
    return new Promise((resolve, reject) => {  
     resolve("ok");  
   });   
}

_publics.getSubCategoriesByTestId = (req) => {
    return new Promise((resolve, reject) => {   
     resolve("ok");  
   });  
  
}

_publics.getQuestionsByTestId = (req) => {
    return new Promise((resolve, reject) => {
     resolve("ok");  
   });  
  
}
_publics.getQuestionsBySubCategory = (req) => {
    return new Promise((resolve, reject) => {
     resolve("ok");  
   });  
  
}

_publics.getQuestionsByCategory = (req) => {
    return new Promise((resolve, reject) => {
     resolve("ok");  
   });  
  
}

_publics.getQuestionsByTest = (req) => {
    return new Promise((resolve, reject) => {
     resolve("ok");  
   });  
  
}






_publics.createCategory = (req) => {
    var name=req.body.name;
    var subCategoriesNumber=req.body.subCategoriesNumber;
    var testId=req.body.testId;
    return new Promise((resolve, reject) => {   
     resolve("ok");  
   });  
  
}

_publics.createSubCategory = (req) => {
    var name=req.body.name;
    var idCategory=req.body.idCategory;
    return new Promise((resolve, reject) => { 
     resolve("ok");  
   });  
  
}

_publics.createQuestion = (req) => {
    var name=req.body.name;
    var value=req.body.value;
    var wording=req.body.wording;
    var subcategoryId=req.body.subcategoryId;
    var testId=req.body.testId;
    return new Promise((resolve, reject) => {
     resolve("ok");  
   });  
  
}


_publics.createSchool = (req) => {
    var name=req.body.name;
    var school=new school();
    school.name=name;
    return new Promise((resolve, reject) => {  
        var msg="";
        var sql = "INSERT INTO school SET ? ";
        con.query(sql,school, function (err, school) {
           if (err){
               msg="failure"; 
               response = {
                 msg: msg
             };
             reject(err);
             }else{
               msg="success";
               response = {
                 msg: msg,
                 school: school

             };
 
             }
         
         return resolve(response);
        });
   });  
  
}



_publics.createClazz = (req) => {
    var name=req.body.name;
    var idSchool=req.body.idSchool;
    return new Promise((resolve, reject) => {
     resolve("ok");  
   });  
  
}

_publics.createEtalonnage = (req) => {
    var lowerBound=req.body.lowerBound;
    var upperBound=req.body.upperBound;
    var value=req.body.value;
    var idSubCategory=req.body.idSubCategory;
    return new Promise((resolve, reject) => {  
     resolve("ok");  
   });  
  
}




module.exports = _publics;