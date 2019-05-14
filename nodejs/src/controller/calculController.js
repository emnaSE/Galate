'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var con=config.con;
var url=`http://localhost:3000`;
//etalonnage

_publics.createEtalonnage = (etalonnage) => { 
    var etalonnage=JSON.parse(etalonnage);
    var lower_bound=etalonnage.lower_bound;
    var upper_bound=etalonnage.upper_bound;
    var value=etalonnage.value;
    var id_subcategory=etalonnage.id_subcategory;
    
    
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "INSERT INTO etalonnage SET ? ";
             const newEtalonnage = { lower_bound: lower_bound,upper_bound:upper_bound,value:value,id_subcategory:id_subcategory};
             con.query(sql,newEtalonnage, function (err, result) {
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

_publics.updateEtalonnage=(req,etalonnage) => { 
    var etalonnage=JSON.parse(etalonnage);
    var lower_bound=etalonnage.lower_bound;
    var upper_bound=etalonnage.upper_bound;
    var value=etalonnage.value;
    var id_subcategory=etalonnage.id_subcategory;
  
  
    var id=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg="";
             var sql = "UPDATE etalonnage SET lower_bound=?, upper_bound=?, value=?, id_subcategory=?  WHERE id = ?"; 
             con.query(sql,[lower_bound,upper_bound,value,id_subcategory,id], function (err, result) {
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

_publics.deleteEtalonnage = (req) => { 
    var id=req.query.id;
   return new Promise((resolve, reject) => {  
            var sql = "DELETE FROM etalonnage WHERE id = ?"; 
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

_publics.getAllEtalonnages = (req) => { 
  
    return new Promise((resolve, reject) => {  
             var sql = "select * FROM etalonnage"; 
           
                 con.query(sql, function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
     });    
 };






















 module.exports = _publics;