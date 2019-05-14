
'use strict';

const _publics = {};
var config = require('../config');
var con=config.con;
var getRawBody = require('raw-body');
const request = require('request');



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
  var test_subcategories_number=test0.test_subcategories_number;
  var name=test0.name;
  var password=test0.password;
  var activation_date=test0.activation_date;
  var expiration_date=test0.expiration_date;
    return new Promise((resolve, reject) => { 
     var msg="";
           var sql = "INSERT INTO test SET ? ";
           const test0 = { name: name,test_subcategories_number:test_subcategories_number,password:password,activation_date:activation_date,expiration_date:expiration_date};
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



function ceateTestCategory(testId, categoryId){
  var msg="";
  return new Promise((resolve, reject) => {
      var sql = "INSERT INTO test_category SET? ";
      con.query(sql,{id_test:testId,id_category:categoryId}, function (err, affectation) {
        if (err){
          console.log(err);
          msg="failure"; 
          }else{
            msg="success";  
          }
          return resolve(msg);
      });   
    });
}

function ceateTestsubcategory(testId, subcategoryId, questionsNumber, wording){
  var msg="";
  return new Promise((resolve, reject) => {
      var sql = "INSERT INTO test_subcategory SET? ";
      con.query(sql,{id_test:testId,id_subcategory:subcategoryId,questions_number:questionsNumber, wording:wording}, function (err, affectation) {
        if (err){
          console.log(err);
          msg="failure"; 
          }else{
            msg="success";  
          }
          return resolve(msg);
      });   
    });
}


function removeTestCategory(testId, categoryId){
  var bool=false;
  return new Promise((resolve, reject) => {
      var sql = "delete from test_category where id_test=? ";
      con.query(sql,[testId], function (err, res) {
        if (err)
          reject(err);
        return resolve(res>0);
      });   
    });
}

function removeTestSubcategory(testId, subcategoryId){
  var bool=false;
  return new Promise((resolve, reject) => {
      var sql = "delete from test_subcategory where id_test=? ";
      con.query(sql,[testId], function (err, res) {
        if (err)
          reject(err);
        return resolve(res>0);
      });   
    });
}

_publics.AffectCategoriesToTest = (testId, categoriesList) => {
  let promises = [];
  let response;
  for(var i=0;i<categoriesList.length;i++){
      promises.push( new Promise((resolve, reject) => {
          response=ceateTestCategory(testId, categoriesList[i].categoryId);
          return resolve(response);
      }
  ));
  }
  return Promise.all(promises)
}


_publics.AffectSubcategoriesToTest = (testId, subcategoriesList, questionsNumber, wording) => {
  let promises = [];
  let response;
  for(var i=0;i<subcategoriesList.length;i++){
      promises.push( new Promise((resolve, reject) => {
          response=ceateTestsubcategory(testId, subcategoriesList[i].subcategoryId, questionsNumber, wording);
          return resolve(response);
      }
  ));
  }
  return Promise.all(promises)
}


_publics.RemoveAffectationCategoriesToTest = (testId, categoriesList) => {
  let promises = [];
  let response;
  for(var i=0;i<categoriesList.length;i++){
      promises.push( new Promise((resolve, reject) => {
          response=removeTestCategory(testId, categoriesList[i].categoryId);
          return resolve(response);
      }
  ));
  }
  return Promise.all(promises)
}



_publics.RemoveAffectationSubcategoriesToTest = (testId, subcategoriesList) => {
  let promises = [];
  let response;
  for(var i=0;i<subcategoriesList.length;i++){
      promises.push( new Promise((resolve, reject) => {
          response=removeTestSubcategory(testId, subcategoriesList[i].subcategoryId);
          return resolve(response);
      }
  ));
  }
  return Promise.all(promises)
}





module.exports = _publics;