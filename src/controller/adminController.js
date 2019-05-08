'use strict';

const _publics = {};
//Category Controller
_publics.createCategory = (req) => { 
    var name=req.name;
    var subCategoriesNumber=req.subCategoriesNumber;
    return new Promise((resolve, reject) => {  
             var sql = "insert into category (name,subCategoriesNumber) values(?,?)";
             con.query(sql,[name,subCategoriesNumber], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 

 _publics.updateCategory = (req) => { 
  var name=req.name;
    var subCategoriesNumber=req.subCategoriesNumber;
    var id=req.id;
    return new Promise((resolve, reject) => {  
             var sql = "update  category set name=?,subCategoriesNumber=? where id=?";
             con.query(sql,[name,subCategoriesNumber,id], function (err, result) {
               if (err) reject(err);               
              return resolve(result);
             });
             
           });    
 }; 
 _publics.deleteCategory = (req) => { 
    var id=req.id;
    return new Promise((resolve, reject) => {  
             var sql = "delete from   category where id=?";
             con.query(sql,[id], function (err, result) {
                if (err) reject(err);               
              return resolve(result);
             });
           });    
 }; 

 _publics.createClazz = (req) => { 
    var name=req.name;
    var idSchool=req.idSchool;
    return new Promise((resolve, reject) => {  
             var sql = "insert into Clazz (name,idSchool) values(?,?)";
             con.query(sql,[name,idSchool], function (err, result) {
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
 _publics.updateClazz = (req) => { 
    var name=req.name;
    var idSchool=req.idSchool;
    var id=req.id;
    return new Promise((resolve, reject) => {  
             var sql = "update  Clazz set name=?,idSchool=? where id=?";
             con.query(sql,[name,idSchool,id], function (err, result) {
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