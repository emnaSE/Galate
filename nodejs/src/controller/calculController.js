'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var con=config.con;
//etalonnage
var memberController=require('../controller/memberController');
var SECOND_ANSWER=2;
var FIRST_ANSWER=1;
const router = require('express').Router();
router.use((req, res, next) => {
  res.payload = {};
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader('Access-Control-Allow-Credentials', true)
  next();
});
const request = require('request');
var config = require('../config');
var url=`http://localhost:`+config.port;


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
             var sql = "select e.*, sc.name as subcategory FROM etalonnage e left join subcategory sc on(e.id_subcategory=sc.id) order by id DESC"; 
           
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


_publics.getLineSum = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql=" select tsc.id_subcategory, count(*) as sum from test_subcategory tsc left join question q on(q.id_test_subcategory=tsc.id) left join answer a on(a.id_question=q.id) "
           +"left join choice_member cm on(cm.id_answer=a.id) left join test_member tm on(tm.id=cm.id_test_member) where tm.id_member=? and tm.id_test=? and a.ordre=? group by tsc.id_subcategory ";
               con.query(sql,[id_member,id_test, SECOND_ANSWER], function (err, result) {
               if (err) reject(err);
               return resolve(result);
               });
   });    
};
/*_publics.getLineSum = (req, line) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql=" select tsc.id_subcategory, count(*) from test_subcategory tsc "+
           "left join question q on(q.id_test_subcategory=tsc.id) left join choice_member cm on(cm.id_question=q.id) "+
           "left join test_member tm on(tm.id=cm.id_test_member)   left join answer a on(a.id=cm.id_answer) where tm.id_test=? and tm.id_member=? and tsc.ordre=? and a.ordre=? ";
               con.query(sql,[id_test, id_member, line, SECOND_ANSWER], function (err, result) {
               if (err) reject(err);
               return resolve(result);
               });
   });  
};*/


_publics.getSumByOrder = (req, testSubcategories) => { 

  let promises = [];
  for (var i=0;i<testSubcategories.length;i++) {
    promises.push( new Promise((resolve, reject) => {  
     // console.log(testSubcategories[i].ordre);
            var sum=getSumByOrder(req, testSubcategories[i].ordre);
            return resolve(sum);
          }));
   }
   return Promise.all(promises)  
};



function getSumByOrder(req, order){ 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql="select tscat.id_subcategory as subcat , "+
           "(select count(*) from test_subcategory tsc "+
             "left join question q on(q.id_test_subcategory=tsc.id) left join choice_member cm on(cm.id_question=q.id) "+
             "left join test_member tm on(tm.id=cm.id_test_member)   left join answer a on(a.id=cm.id_answer) where tm.id_test=? and tm.id_member=? and tsc.ordre=? and a.ordre=?) "+
           "+ (select count(*) from test_subcategory tsc  left join question q on(q.id_test_subcategory=tsc.id) "+
            " left join choice_member cm on(cm.id_question=q.id) left join test_member tm on(tm.id=cm.id_test_member)   "+
            " left join answer a on(a.id=cm.id_answer) where tm.id_test=? and tm.id_member=? and q.ordre=? and a.ordre=?) as total "+
           "from test_subcategory tscat  left join test_member tm on(tm.id_test=tscat.id_test)  where tm.id_test=? and tm.id_member=? and tscat.ordre=? ";
               con.query(sql,[id_test, id_member, order, SECOND_ANSWER, id_test, id_member, order, FIRST_ANSWER,id_test, id_member, order], function (err, result) {
               if (err) reject(err);
               return resolve(result[0]);
               });
   });  
};

_publics.getSubcategoriesAnswers = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql=" select tsc.id_subcategory, cm.id_answer as answer, tsc.ordre as x, q.ordre as y from test_subcategory tsc "+
           "left join question q on(q.id_test_subcategory=tsc.id) left join choice_member cm on(cm.id_question=q.id) "+
           "left join test_member tm on(tm.id=cm.id_test_member)  where tm.id_test=? and tm.id_member=? ";
               con.query(sql,[id_test, id_member], function (err, result) {
               if (err) reject(err);
               return resolve(result);
               });
   });    
};


_publics.getResultLinePerSubcategory = (req,subcategories) => { 

  let promises = [];
  for (var i=0;i<JSON.parse(subcategories).length;i++) {
    promises.push( new Promise((resolve, reject) => {  
            var lineSum=getLineValuesSum(req,JSON.parse(subcategories)[i].ordre,JSON.parse(subcategories)[i].testSubcategoryId);
            return resolve(lineSum);
          }));
   }
   return Promise.all(promises)  
};
_publics.getResultColumnPerSubcategory = (req,subcategories) => { 

  let promises = [];
  for (var i=0;i<JSON.parse(subcategories).length;i++) {
    promises.push( new Promise((resolve, reject) => {  
            var columnSum=getColumnValuesSum(req,JSON.parse(subcategories)[i].ordre == null ? i : JSON.parse(subcategories)[i].ordre );
            return resolve(columnSum);
          }));
   }
   return Promise.all(promises)  
};

function getLineValuesSum (req,order,id_test_subcategory){ 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql=" select tsc.id_subcategory as id_subcategory, q.ordre as subcategoryOrder, count(*) as sum from test_subcategory tsc left join question q on(q.id_test_subcategory=tsc.id) left join answer a on(a.id_question=q.id) "
           +"left join choice_member cm on(cm.id_answer=a.id) left join test_member tm on(tm.id=cm.id_test_member) where tm.id_member=? and tm.id_test=? and a.ordre=? and tsc.ordre=? and tsc.id=? ";
               con.query(sql,[id_member,id_test, SECOND_ANSWER,order,id_test_subcategory], function (err, result) {
               if (err) reject(err);
               //console.log("-----------------------------==>"+JSON.stringify(result[0]));
               return resolve(result);
               });
   });    
};

function getColumnValuesSum (req,order){ 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql="select tsc.id_subcategory as subcategoryOrder, count(*) as sum from test_subcategory tsc left join question q on(q.id_test_subcategory=tsc.id) left join answer a on(a.id_question=q.id) "
           +"left join choice_member cm on(cm.id_answer=a.id) left join test_member tm on(tm.id=cm.id_test_member) where tm.id_member=? and tm.id_test=? and a.ordre=? and q.ordre=?";
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



_publics.updateListOfManuelAnswers= (req, sum) => { 
  let promises = [];
 var id_test=req.query.id_test;
 var id_member=req.query.id_member;
 for (var i=0;i<sum.length;i++) {
              promises.push( new Promise((resolve, reject) => {  
                var msg="";
                var sql = "update manuel_answer set result=?  where  id_member=? and id_test=? and id_subcategory=?";
                con.query(sql,[sum[i].total,id_member,id_test,sum[i].subcat], function (err, result) {
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

_publics.updateManualAnswerEtalonnageResult= (req, sum) => { 
  let promises = [];
 var id_test=req.query.id_test;
 var id_member=req.query.id_member;

 for (var i=0;i<sum.length;i++) {
              promises.push( new Promise((resolve, reject) => {  
                var msg="";
                var sql = "update manuel_answer set etallonage_result = coalesce( ("+
                  " select max(value) from etalonnage where id_subcategory=? and ? between lower_bound and upper_bound) ,0) where id_member=? and id_test=? and id_subcategory=?";
                con.query(sql,[sum[i].subcat,sum[i].total,id_member,id_test,sum[i].subcat], function (err, result) {
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
           var sql = "select distinct c.name  as name , c.id as category_id, c.ordre  from manuel_answer ma left join subcategory sc on(sc.id=ma.id_subcategory) left join category c on (c.id=sc.id_category)  where ma.id_test=? and ma.id_member=? order by c.ordre asc"; 
         
               con.query(sql,[id_test,id_member], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};

_publics.getCategoryNameByMemberIdAndTestIdBySecondOrder = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql = "select distinct c.name  as name , c.id as category_id, c.ordre, c.ordre2  from manuel_answer ma left join subcategory sc on(sc.id=ma.id_subcategory) left join category c on (c.id=sc.id_category)  where ma.id_test=? and ma.id_member=? order by c.ordre2 asc"; 
         
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



/*_publics.getAllCriterionsBySubcategories = (req,subcategories) => { 
  let promises = [];
  for (var i=0;i<JSON.parse(subcategories).length;i++) {
    promises.push( new Promise((resolve, reject) => request.get({
      url :url+`/calcul/getAllCriterionBySubcategoryId?id=${JSON.parse(subcategories)[i].id}&id_test=${req.query.id_test}&id_member=${req.query.id_member}`,
      method: 'GET',
      gzip: true,
    }, (e, r, b) => {
      if (!e && r.statusCode == 200) {
        return resolve(JSON.parse(b));
      } else {
        reject(e);
      }
    })));
  }
  return Promise.all(promises)    
};*/


_publics.getAllCriterionsByCategoryId = (categoryId) => { 
  return new Promise((resolve, reject) => {  
           var sql = "select c.*, c.result as score from criterion c where c.id_category=? order by c.ordre asc"; 
               con.query(sql,[categoryId], function (err, result) {
                if (err){
                  reject(err);
                }
                return resolve(result);
               });
   }); 
};




_publics.getAllCriterionsByCategories=(req,categories) => { 
  let promises = [];
  for (var i=0;i<JSON.parse(categories).length;i++) {
    promises.push( new Promise((resolve, reject) => request.get({
      url :url+`/calcul/getAllCriterionsByCategory?id=${JSON.parse(categories)[i].category_id}&id_test=${req.query.id_test}&id_member=${req.query.id_member}`,
      method: 'GET',
      gzip: true,
    }, (e, r, b) => {
      if (!e && r.statusCode == 200) {
        return resolve(JSON.parse(b));
      } else {
        reject(e);
      }
    })));
  }
  return Promise.all(promises)    
};



_publics.deleteMemberTestResultSkills = (req) => { 
  
  var memberId=req.query.memberId;
  var testId=req.query.testId;
  return new Promise((resolve, reject) => {  
           var sql = "delete from criterion_result where id_test=? and id_member=?"; 
               con.query(sql,[testId,memberId], function (err, result) {
                if (err){
                  reject(err);
                }
                return resolve(result);
               });
   }); 
};


_publics.calculateSkills = (req,res,criterionsList) => { 
    let promises = [];
    var memberId=req.query.memberId;
    var testId=req.query.testId;
    for (var i=0;i<criterionsList.length;i++) {
        promises.push( new Promise((resolve, reject) => {  
          if(criterionsList[i].median===0){
            if(criterionsList[i].id_subcategory2===null){
              calculatePinkSkill(testId,memberId,criterionsList[i]);//one subcategory  without median
            }else{
              calculateYellowSkill(testId,memberId,criterionsList[i]);//two subcategories without median
            }

          }else if(criterionsList[i].id_subcategory2===null){
            calculateBlueSkySkill(testId,memberId,criterionsList[i]);//one subcategory with median
          }else{
            calculateBlueSkill(res,testId,memberId,criterionsList[i]);//two subcategories with median
          }
      }));
    }
     return Promise.all(promises)  

}






function calculatePinkSkill(testId,memberId,criterion){
  return new Promise((resolve, reject) => {  
    getSubcategoryScore(testId,memberId,criterion.id_subcategory1,null)
    .then(score=>{
      return new Promise((resolve, reject) => {  
        var sql = "update criterion set result= ? where id=?"; 
        con.query(sql,[score,criterion.id], function (err, result) {
        if (err)
          reject(err);
        return resolve(score);
        });
      });
    })
    .then(result=>{
      var sql = "INSERT INTO criterion_result SET ? ";
      const newCriterionResult = { id_member: memberId,id_test:testId,result:result,id_criterion:criterion.id};
      con.query(sql,newCriterionResult, function (err, result) {
      if (err)
        reject(err);
      return resolve(result);
      });
    })
  });  
}



function calculateYellowSkill(testId,memberId,criterion){
  return new Promise((resolve, reject) => {  
    getSubcategoriesScore(testId,memberId,criterion)
    .then(score=>{
      return new Promise((resolve, reject) => { 
        var result=score[0].result;
        var sql = "update criterion set result= ? where id=?"; 
        con.query(sql,[result,criterion.id], function (err, res) {
        if (err)
          reject(err);
        return resolve(result);
        });
      });
    })
    .then(result=>{
      var sql = "INSERT INTO criterion_result SET ? ";
      const newCriterionResult = { id_member: memberId,id_test:testId,result:result,id_criterion:criterion.id};
      con.query(sql,newCriterionResult, function (err, res) {
      if (err)
        reject(err);
      return resolve(res);
      });
    })
  });  
}


function getSubcategoriesScore(testId,memberId,criterion){
  
  return new Promise((resolve, reject) => {  
    var sql ="select 	coalesce(  FLOOR(( (select ma.etallonage_result from manuel_answer ma where id_member=? and id_test=? and id_subcategory=?) " +
    " + (select ma.etallonage_result from manuel_answer ma where id_member=? and id_test=? and id_subcategory=?) ) /2) ,0) as result ";
        con.query(sql,[memberId,testId,criterion.id_subcategory1,memberId,testId,criterion.id_subcategory2, criterion.id], function (err, result) {
         if (err){
           reject(err);
         }
         return resolve(result);
        });
  }); 

}


function calculateBlueSkySkill(testId,memberId,criterion){
  return new Promise((resolve, reject) => {  
    getSubcategoryScore(testId,memberId,criterion.id_subcategory1,null)
    .then(score=>{
      var mediane=config.mediane;
      var result=score-mediane;
      result=mediane-result;
      return result;
    })
    .then(result=>{
      return new Promise((resolve, reject) => {  
        var sql = "update criterion set result= ? where id=?"; 
        con.query(sql,[result,criterion.id], function (err, res) {
        if (err)
          reject(err);
        return resolve(result);
        });
      })
    })
    .then(result=>{
      var sql = "INSERT INTO criterion_result SET ? ";
      const newCriterionResult = { id_member: memberId,id_test:testId,result:result,id_criterion:criterion.id};
      con.query(sql,newCriterionResult, function (err, res) {
      if (err)
        reject(err);
      return resolve(res);
      });
    })
  });   
}

function calculateBlueSkill(res,testId,memberId,criterion){
  return new Promise((resolve, reject) => {  
    getSubcategoryScore(testId,memberId,criterion.id_subcategory1,null)
    .then(score1=>{
      res.payload.score1=score1; 
      return getSubcategoryScore(testId,memberId,criterion.id_subcategory2,res.payload.score1);
    })
    .then(score=>{
      return calculateScoreWithMedian(score);
    })
    .then(result=>{
      res.payload.result=result;
      return updateCriterionResult(result,criterion);
    })
    .then(response=>{
      var sql = "INSERT INTO criterion_result SET ? ";
      const newCriterionResult = { id_member: memberId,id_test:testId,result:res.payload.result,id_criterion:criterion.id};
      con.query(sql,newCriterionResult, function (err, res) {
      if (err)
        reject(err);
      return resolve(res);
      });
    })
  }); 
}

function calculateScoreWithMedian(score){
  return new Promise((resolve, reject) => { 
    var mediane=config.mediane;
    var result=score-mediane;
    result=mediane-result;
    var intResult=Math.floor(result);
    return resolve(intResult);
  });
}

function updateCriterionResult(result,criterion){
  return new Promise((resolve, reject) => { 
    var sql = "update criterion set result= ? where id=?"; 
    con.query(sql,[result,criterion.id], function (err, result) {
    if (err)
      reject(err);
    return resolve(result);
    });
  });
}
function getSubcategoryScore(testId,memberId,subcategoryId, score1){
  return new Promise((resolve, reject) => {  
    var sql ="select FLOOR(m.etallonage_result) as score from manuel_answer m where m.id_member=? and id_test=? and m.id_subcategory=?";
        con.query(sql,[memberId,testId,subcategoryId], function (err, res) {
         if (err){
           reject(err);
         }
         var result;
         if(score1!==null){
          var result=(res[0].score+score1)/2;
          return resolve(Math.floor(result));
         }
         return resolve(res[0].score);
        });
  });   
}



/*_publics.saveSkillsResults = (req,criterionsList) => { 
  let promises = [];
  var memberId=req.query.memberId;
  var testId=req.query.testId;
  for (var i=0;i<criterionsList.length;i++) {
      promises.push( new Promise((resolve, reject) => {  
     
        saveSkillsResult(testId,memberId,criterionsList[i]);
 
    }));
  }
   return Promise.all(promises)  

}

function saveSkillsResult(testId,memberId,criterion){
  return new Promise((resolve, reject) => { 
        var sql = "INSERT INTO criterion_result SET ? ";
        const newCriterionResult = { id_member: memberId,id_test:testId,result:criterion.result,id_criterion:criterion.id};
        con.query(sql,newCriterionResult, function (err, result) {
         if (err){
           reject(err);
         }
         return resolve(result);
        });
  });
}*/


 module.exports = _publics;