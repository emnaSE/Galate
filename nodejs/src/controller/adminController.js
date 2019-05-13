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

 _publics.createClazz = (clazz) => { 

  var clazz=JSON.parse(clazz);
  var name=clazz.name;
  var id_school=clazz.id_school;
    return new Promise((resolve, reject) => {  
             var sql = "insert into Clazz (name,id_school) values(?,?)";
             con.query(sql,[name,id_school], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
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

//Class Controller
 _publics.updateClazz = (req,clazz) => { 
    var name=req.name;
    var id_school=req.id_school;
    var id=req.id;
    return new Promise((resolve, reject) => {  
             var sql = "update  Clazz set name=?,id_school=? where id=?";
             con.query(sql,[name,id_school,id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
 _publics.deleteClazzById = (req) => { 
    var id=req.id;
    return new Promise((resolve, reject) => {  
             var sql = "delete from   Clazz where id=?";
             con.query(sql,[id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
 _publics.deleteClazzByIdSchool= (req) => { 
  
    var idSchool=req.idSchool;

    return new Promise((resolve, reject) => {  
             var sql = "delete from   Clazz where idSchool=?";
             con.query(sql,[idSchool], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
 // school controller
_publics.createSchool = (req) => { 
    var name=req.name;
 
    return new Promise((resolve, reject) => {  
             var sql = "insert into school (name) values(?)";
             con.query(sql,[name], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 

 _publics.updateSchool = (req) => { 
  var name=req.name;
 
  var id=req.id;
    return new Promise((resolve, reject) => {  
             var sql = "update  school set name=? where id=?";
             con.query(sql,[name,id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
 
 _publics.deleteSchool = (req) => { 
    var id=req.id;
    
    return new Promise((resolve, reject) => {  
           var sql = "delete from   school where id=?";
           con.query(sql,[id], function (err, result) {
              if (err) reject(err);               
            return resolve(result);
           });
         });    
}; 
// subCategory Controller
_publics.createSubCategory = (req) => { 
    var name=req.name;
    var idCategory=req.idCategory;
    return new Promise((resolve, reject) => {  
             var sql = "insert into subCategory (name,idCategory) values(?,?)";
             con.query(sql,[name,idCategory], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 

 _publics.updateSubCategory = (req) => { 
  var name=req.name;
  var idCategory=req.idCategory;
  var id=req.id;
    return new Promise((resolve, reject) => {  
             var sql = "update  subCategory set name=?,idCategory=? where id=?";
             con.query(sql,[name,idCategory,id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
 _publics.deleteSubCategoryById = (req) => { 
    var id=req.id;
    return new Promise((resolve, reject) => {  
             var sql = "delete from   subCategory where id=?";
             con.query(sql,[id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 
 _publics.deleteSubCategorysByIdCategory = (req) => { 
  var idCategory=req.idCategory;
  return new Promise((resolve, reject) => {  
           var sql = "delete from   subCategory where idCategory=?";
           con.query(sql,[idCategory], function (err, result) {
              if (err) reject(err);               
            return resolve(result);
           });
         });    
}; 

module.exports = _publics;