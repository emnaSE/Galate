'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var con=config.con;
//etalonnage
var memberController=require('../controller/memberController');
var SECOND_ANSWER=2;
var FIRST_ANSWER=1;

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
             var sql = "select e.*, sc.name as subcategory FROM etalonnage e left join subcategory sc on(e.id_subcategory=sc.id) "; 
           
                 con.query(sql, function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
     });    
 };

_publics.getEtalonnageById = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM etalonnage where id=?"; 
         
               con.query(sql,[id], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};





/*_publics.getLineSum = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql = "select sum(a.value) as sum from answer a left join choice_member cm on(cm.id_answer=a.id) left join question q on (q.id=cm.id_question)"+
           " left join test_member tm on(tm.id_test=cm.id_test_member) where ordre=1 and tm.id_test=? and tm.id_member=?"; 
         
               con.query(sql,[id_test,id_member], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};*/

/*_publics.getLineSum = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql = "select tsc.id_subcategory, sum(a.value) as sum from answer a left join choice_member cm on(cm.id_answer=a.id) left join question q on (q.id=cm.id_question)"+
           " left join test_member tm on(tm.id_test=cm.id_test_member) left join test_subcategory tsc on(tm.id_test=tsc.id_test) where ordre=1 and tm.id_test=? and tm.id_member=? group by tsc.id_subcategory"; 
         
               con.query(sql,[id_test,id_member], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};*/
_publics.getLineSum = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql=" select tsc.id_subcategory, sum(a.value) as sum from test_subcategory tsc left join question q on(q.id_test_subcategory=tsc.id) left join answer a on(a.id_question=q.id) "
           +"left join choice_member cm on(cm.id_answer=a.id) left join test_member tm on(tm.id=cm.id_test_member) where tm.id_member=? and tm.id_test=? and a.ordre=? group by tsc.id_subcategory ";
               con.query(sql,[id_member,id_test, SECOND_ANSWER], function (err, result) {
               if (err) reject(err);
               return resolve(result);
               });
   });    
};

function getLineValuesSum (req,order){ 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql=" select tsc.id_subcategory, sum(a.value) as sum from test_subcategory tsc left join question q on(q.id_test_subcategory=tsc.id) left join answer a on(a.id_question=q.id) "
           +"left join choice_member cm on(cm.id_answer=a.id) left join test_member tm on(tm.id=cm.id_test_member) where tm.id_member=? and tm.id_test=? and a.ordre=? and tsc.ordre=? group by tsc.id_subcategory ";
               con.query(sql,[id_member,id_test, SECOND_ANSWER,order], function (err, result) {
               if (err) reject(err);
               return resolve(result);
               });
   });    
};

function getColumnValuesSum (req,order){ 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql=" select tsc.id_subcategory, sum(a.value) as sum from test_subcategory tsc left join question q on(q.id_test_subcategory=tsc.id) left join answer a on(a.id_question=q.id) "
           +"left join choice_member cm on(cm.id_answer=a.id) left join test_member tm on(tm.id=cm.id_test_member) where tm.id_member=? and tm.id_test=? and a.ordre=? and q.ordre=? group by tsc.id_subcategory ";
               con.query(sql,[id_member,id_test, FIRST_ANSWER,order], function (err, result) {
               if (err) reject(err);
               return resolve(result);
               });
   });    
};

_publics.createManuelAnswer= (req,sum) => { 
  
  var sum=JSON.parse(sum);
 var id_test=req.query.id_test;
 var id_member=req.query.id_member;
 var id_subcategory=req.query.id_subcategory;
 
  return new Promise((resolve, reject) => {  
           var msg="";
           var sql = "INSERT INTO manuel_answer SET ? ";
           const manuelAnswer = { id_test: id_test,id_member:id_member,id_subcategory:id_subcategory,result:sum[0].sum};
           con.query(sql,manuelAnswer, function (err, result) {
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


_publics.createListOfManuelAnswers= (req, sumLines) => { 
  let promises = [];
 var id_test=req.query.id_test;
 var id_member=req.query.id_member;
 for (var i=0;i<sumLines.length;i++) {
              promises.push( new Promise((resolve, reject) => {  
                var msg="";
                var sql = "INSERT INTO manuel_answer SET ? ";
                const manuelAnswer = { id_test: id_test,id_member:id_member,id_subcategory:sumLines[i].id_subcategory,result:sumLines[i].sum};
                con.query(sql,manuelAnswer, function (err, result) {
                if (err){
                  msg="failure"; 
                  reject(err);
                }else{
                  msg="success";
                }
                return resolve(msg);
              });
            }));
  }
  return Promise.all(promises)   
};



_publics.updateListOfManuelAnswers= (req, sumLines) => { 
  let promises = [];
 var id_test=req.query.id_test;
 var id_member=req.query.id_member;
 for (var i=0;i<sumLines.length;i++) {
              promises.push( new Promise((resolve, reject) => {  
                var msg="";
                var sql = "update manuel_answer set result=?  where  id_member=? and id_test=? and id_subcategory=?";
                con.query(sql,[sumLines[i].sum,id_member,id_test,sumLines[i].id_subcategory], function (err, result) {
                if (err){
                  msg="failure"; 
                  reject(err);
                }else{
                  msg="success";
                }
                return resolve(msg);
              });
            }));
  }
  return Promise.all(promises)   
};

_publics.updateManualAnswerEtalonnageResult= (req, sumLines) => { 
  let promises = [];
 var id_test=req.query.id_test;
 var id_member=req.query.id_member;
 for (var i=0;i<sumLines.length;i++) {
              promises.push( new Promise((resolve, reject) => {  
                var msg="";
                var sql = "update manuel_answer set etallonage_result = coalesce( ("+
                  " select max(value) from etalonnage where id_subcategory=? and ? between lower_bound and upper_bound) ,0) where id_member=? and id_test=? and id_subcategory=?";
                con.query(sql,[sumLines[i].id_subcategory,sumLines[i].sum,id_member,id_test,sumLines[i].id_subcategory], function (err, result) {
                if (err){
                  msg="failure"; 
                  reject(err);
                }else{
                  msg="success";
                }
                return resolve(msg);
              });
            }));
  }
  return Promise.all(promises)   
};



_publics.setEtalonnageValue= (req,value) => { 

   
  var value=JSON.parse(value);
   // var id=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg="";
             var sql = "UPDATE manuel_answer set etallonage_result=?  WHERE id = ?"; 
             con.query(sql,[value[0].value,value[1].id], function (err, result) {
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



_publics.getEtalonnageValue = (req) => { 
  var id_subcategory=req.query.id_subcategory;
  return new Promise((resolve, reject) => {  
           var sql = "select e.value as value, ma.id as id from etalonnage e left join manuel_answer ma on(ma.id_subcategory=e.id_subcategory) where ma.id_subcategory=? and ma.result between e.upper_bound and e.lower_bound"; 
         
               con.query(sql,[id_subcategory], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};
// ;
_publics.getEtalonnageResults = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql = "select c.name as catName,sc.name as subCatName, sc.down_description, sc.up_description, ma.etallonage_result as result from manuel_answer ma left join subcategory sc on(sc.id=ma.id_subcategory) left join category c on (c.id=sc.id_category)  where ma.id_test=? and ma.id_member=?"; 
         
               con.query(sql,[id_test,id_member], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};

_publics.getCategoryNameByMemberIdAndTestId = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql = "select distinct c.name  as name , c.id as category_id  from manuel_answer ma left join subcategory sc on(sc.id=ma.id_subcategory) left join category c on (c.id=sc.id_category)  where ma.id_test=? and ma.id_member=? "; 
         
               con.query(sql,[id_test,id_member], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};
_publics.getEtalonnageDetails = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  var id_category=req.query.id_category;
  return new Promise((resolve, reject) => {  
           var sql = "select sc.name as subCatName, sc.down_description, sc.up_description, ma.etallonage_result as result from manuel_answer ma left join subcategory sc on(sc.id=ma.id_subcategory) left join category c on (c.id=sc.id_category)  where ma.id_test=? and ma.id_member=? and c.id = ?"; 
         
               con.query(sql,[id_test,id_member,id_category], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};


_publics.getSubCategoryName = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  var id_category=req.query.id_category;
  return new Promise((resolve, reject) => {  
           var sql = "select sc.name as subCatName from manuel_answer ma left join subcategory sc on(sc.id=ma.id_subcategory) left join category c on (c.id=sc.id_category)  where ma.id_test=? and ma.id_member=?"; 
         
               con.query(sql,[id_test,id_member,id_category], function (err, result) {
               if (err) reject(err);
               return resolve(result);
               });
   });    
};

_publics.updateManualAnswer = (req) => { 
  var manualAnwserId=req.query.manualAnwserId;
  var response=req.query.response;
  return new Promise((resolve, reject) => {  
           var sql = "update manuel_answer set response=? where id=?"; 
           var msg="";
               con.query(sql,[response,manualAnwserId], function (err, result) {
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


 module.exports = _publics;