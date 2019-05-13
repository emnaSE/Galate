'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var con=config.con;

_publics.createCategory = (category) => { 
    var category=JSON.parse(category);
    var name=category.name;
    var subcategories_number=category.subcategories_number;
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "INSERT INTO category SET ? ";
             const newCategory = { name: name,subcategories_number:subcategories_number};
             con.query(sql,newCategory, function (err, result) {
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
 _publics.updateCategory = (req,category) => { 
  var category1=JSON.parse(category);

  var name=category1.name;
    var subcategories_number=category1.subcategories_number;
    var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var sql = "update  category set name=?,subcategories_number=? where id=?";
             con.query(sql,[name,subcategories_number,id], function (err, result) {
               if (err) reject(err);               
              return resolve(result);
             });
             
           });    
 }; 
 _publics.deleteCategory = (req) => { 
    var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var sql = "delete from   category where id=?";
             con.query(sql,[id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
//Class Controller




 _publics.createClazz = (clazz) => { 

  var clazz=JSON.parse(clazz);
  var name=clazz.name;
  var id_school=clazz.id_school;
    return new Promise((resolve, reject) => {  
      var msg="";
             var sql = "insert into clazz set ?";
             const newClazz={name:name,id_school:id_school};
             con.query(sql,newClazz, function (err, result) {
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




 _publics.updateClazz = (req,clazz) => { 
   var clazz=JSON.parse(clazz);
    var name=clazz.name;
    var id_school=clazz.id_school;
    var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var sql = "update  clazz set name=?,id_school=? where id=?";
             con.query(sql,[name,id_school,id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 


 

 _publics.deleteClazzById = (req) => { 
    var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var sql = "delete from   clazz where id=?";
             con.query(sql,[id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
 _publics.deleteClazzByIdSchool= (req) => { 
  
    var id_school=req.query.id_school;

    return new Promise((resolve, reject) => {  
             var sql = "delete from   clazz where id_school=?";
             con.query(sql,[id_school], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
 // school controller


_publics.createSchool = (school) => { 
  var school =JSON.parse(school)  
  var name=req.query.name;
 
    return new Promise((resolve, reject) => {
      var msg="";  
             var sql = "insert into school set ?";
             const newSchool = { name: name};

              con.query(sql,newSchool, function (err, result) {
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

      
 _publics.updateSchool = (req,school) => { 
  var school=JSON.parse(school);
  var name=school.name;
 
  var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var sql = "update  school set name=? where id=?";
             con.query(sql,[name,id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
 
 
 _publics.deleteSchool = (req) => { 
    var id=req.query.id;
    
    return new Promise((resolve, reject) => {  
           var sql = "delete from   school where id=?";
           con.query(sql,[id], function (err, result) {
              if (err) reject(err);               
            return resolve(result);
           });
         });    
}; 
// subCategory Controller



_publics.createSubCategory = (subcategory) => { 
    var subcategory=JSON.parse(subcategory)
    var name=subcategory.name;
    var id_category=subcategory.id_category;
  

    return new Promise((resolve, reject) => { 
      var msg="";
      var sql = "insert into subcategory set ? ";

      const newsubcategory = { name: name,id_category:id_category}; 
          
      con.query(sql,newsubcategory, function (err, result) {
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

 _publics.updateSubCategory = (req,subcategory) => { 
   var subcategory=JSON.parse(subcategory);
  var name=subcategory.name;
  var id_category=subcategory.id_category;
  var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var sql = "update  subcategory set name=?,id_category=? where id=?";
             con.query(sql,[name,id_category,id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 


 _publics.deleteSubCategoryById = (req) => { 
    var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var sql = "delete from   subcategory where id=?";
             con.query(sql,[id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
 _publics.deleteSubCategorysByIdCategory = (req) => { 
  var id_category=req.query.id_category;
  return new Promise((resolve, reject) => {  
           var sql = "delete from   subCategory where id_category=?";
           con.query(sql,[id_category], function (err, result) {
              if (err) reject(err);               
            return resolve(result);
           });
         });    
}; 

module.exports = _publics;