'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var con=config.con;

const path = require('path');
var fs = require("fs"); // node filesystem
var tmp = require('tmp');
const lineReader = require('line-reader');



const request = require('request');
var url=`http://localhost:`+config.port;
const perf = require('execution-time')();

_publics.getAllCategories = (req) => { 
  
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM category order by id DESC"; 
         
               con.query(sql, function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};
_publics.getCategoryById = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM category where id=?"; 
         
               con.query(sql, [id],function (err, result) {
               if (err) reject(err);
              
               return resolve(JSON.stringify(result[0]));
               });
   });    
};


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
             var msg="";
             var sql = "update  category set name=?,subcategories_number=? where id=?";
             con.query(sql,[name,subcategories_number,id], function (err, result) {
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
 _publics.deleteCategory = (req) => { 
    var id=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg=""; 
             var sql = "delete from category where id=?";
             con.query(sql,[id], function (err, result) {
              if (err){
                msg="failure";
              }else{
                msg="success";
              }
             return resolve(msg);
             });
           });    
 }; 



 // clazz controller
_publics.getAllClasses = (req) => { 
  
  return new Promise((resolve, reject) => {  
           var sql = "select c.*, s.name as school FROM clazz c left join school s on(s.id=c.id_school) order by id DESC"; 
         
               con.query(sql, function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};
_publics.getClassById = (req) => { 
  var id =req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM clazz where id=?"; 
         
               con.query(sql, [id],function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result[0]));
               });
   });    
};

_publics.getAllClassesByIdSchool = (req) => { 
  var id_school=req.query.id_school;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM clazz where id_school=?"; 
         
               con.query(sql, [id_school],function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};
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
             var msg="";
             var sql = "update  clazz set name=?,id_school=? where id=?";
             con.query(sql,[name,id_school,id], function (err, result) {
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


 

 _publics.deleteClazzById = (req) => { 
    var id=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg=""; 
             var sql = "delete from   clazz where id=?";
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
 _publics.deleteClazzByIdSchool= (req) => { 
  
    var id_school=req.query.id_school;

    return new Promise((resolve, reject) => { 
             var msg="";  
             var sql = "delete from   clazz where id_school=?";
             con.query(sql,[id_school], function (err, result) {
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
 // school controller

 _publics.getAllSchools = (req) => { 
  
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM school order by id DESC"; 
         
               con.query(sql, function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};
_publics.getSchoolById = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM school where id=?"; 
         
               con.query(sql,[id] ,function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result[0]));
               });
   });    
};
_publics.createSchool = (school) => { 
  var school =JSON.parse(school) ; 
  var name=school.name;
 
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
             var msg="";  
             var sql = "update  school set name=? where id=?";
             con.query(sql,[name,id], function (err, result) {
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
 
 
 _publics.deleteSchool = (req) => { 
    var id=req.query.id;
    
    return new Promise((resolve, reject) => { 
           var msg="";   
           var sql = "delete from   school where id=?";
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
// subCategory Controller



_publics.getSubcategoryById = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM subcategory where id=?"; 
         
               con.query(sql,[id], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result[0]));
               });
   });    
};

_publics.getSubcategoryWithScoreById = (req) => { 
  var id=req.query.id;
  var memberId=req.query.id_member;
  var testId=req.query.id_test;
  return new Promise((resolve, reject) => {  
           var sql = "select sc.*,ma.etallonage_result as score  FROM subcategory sc left join manuel_answer ma on(sc.id=ma.id_subcategory) where sc.id=? and ma.id_member=? and ma.id_test=?";           
               con.query(sql,[id,memberId,testId], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result[0]));
               });
   });    
};

_publics.getAllSubcategories = (req) => { 
  
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM subcategory"; 
         
               con.query(sql, function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};

_publics.getAllSubcategoriesByIdTest = (req) => { 
    var idtest=req.query.id_test;
    return new Promise((resolve, reject) => {  
             var sql = "select  distinct name as subcategory,s.id , ts.ordre, ts.id as testSubcategoryId  FROM subcategory s left join test_subcategory ts on (s.id=ts.id_subcategory) where ts.id_test=?"; 
           
                 con.query(sql,[idtest], function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
     });    
  };
_publics.getAllSubcategoriesByCategory = (req) => { 
  var idCategory=req.query.idCategory;
  var idMember=req.query.id_member;
  return new Promise((resolve, reject) => {  
           var sql = "select sc.*, ma.id as manualAnswerId, ma.etallonage_result as score FROM subcategory sc left join manuel_answer ma on(sc.id=ma.id_subcategory) where sc.id_category=? and ma.id_member=? order by sc.ordre asc"; 
         
               con.query(sql,[idCategory,idMember], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};


_publics.getAllSubcategoriesByCategoryId = (req) => { 
  var idCategory=req.query.idCategory;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM subcategory  where id_category=? "; 
         
               con.query(sql,[idCategory], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};

_publics.createSubCategory = (subcategory) => { 
    var subcategory=JSON.parse(subcategory)
    var name=subcategory.name;
    var id_category=subcategory.id_category;
    var down_description=subcategory.down_description;
    var up_description=subcategory.up_description;

    return new Promise((resolve, reject) => { 
      var msg="";
      var sql = "insert into subcategory set ? ";
      const newsubcategory = { name: name,id_category:id_category,up_description:up_description,down_description:down_description};         
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
  var down_description=subcategory.down_description;
    var up_description=subcategory.up_description;
  var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "update  subcategory set name=?,id_category=?,down_description=?,up_description=? where id=?";
             con.query(sql,[name,id_category,down_description,up_description,id], function (err, result) {
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


 _publics.deleteSubCategoryById = (req) => { 
    var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "delete from   subcategory where id=?";
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
 _publics.deleteSubCategorysByIdCategory = (req) => { 
  var id_category=req.query.id_category;
  return new Promise((resolve, reject) => { 
           var msg=""; 
           var sql = "delete from   subcategory where id_category=?";
           con.query(sql,[id_category], function (err, result) {
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

_publics.getRawBody = (req) => { 
  return new Promise((resolve, reject) => { 
          getRawBody(req, {
            length: req.headers['content-length'],
            limit: '1mb',
          }, function (err, string) {
            if (err){
              return next(err)
            } 
            req.text = string;
            return resolve(req.text);
          })
  });    
};

//Question controller
_publics.createQuestion = (question ) => { 
  
  var question=JSON.parse(question);
  var name=question.name;
  var wording=question.wording;
  var value=question.value;  
  var id_test_subcategory=question.id_test_subcategory;
  return new Promise((resolve, reject) => {  
           var msg="";
           var sql = "INSERT INTO question SET ? ";
           const newQuestion = { name: name,wording:wording,value:value,id_test_subcategory:id_test_subcategory};
           con.query(sql,newQuestion, function (err, result) {
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



_publics.createNewQuestion = (question, testSubCategId) => { 
  var question=JSON.parse(question);
  var name=question.name;
  var wording=question.wording;
  var value=question.value;  
  var id_test_subcategory=testSubCategId;
  var ordre=question.ordre; 
  return new Promise((resolve, reject) => {  
           var response={};
           var questionId;
           var sql = "INSERT INTO question SET ? ";
           const newQuestion = { name: name,wording:wording,value:value,id_test_subcategory:id_test_subcategory,ordre:ordre};
           con.query(sql,newQuestion, function (err, result) {
              if (err){
                response={
                  msg:"failure"
                }
                  reject(err);
                }else{
                  response={
                    msg:"success",
                    questionId:result.insertId
                  }
                  
                }
            return resolve(response);
           });
  });   

      
}; 

_publics.getTestSubcategoryByTestIdAndSubcateoryId = (req) => { 
  var testId=req.query.testId;
  var subcategoryId=req.query.subcategoryId;
  return new Promise((resolve, reject) => {  
           var sql = "select id from test_subcategory where id_test=? and id_subcategory=?";
           con.query(sql,[testId,subcategoryId], function (err, result) {
              if (err)
                  reject(err);
              return resolve(result);
            
           });
  });   

      
}; 



_publics.updateQuestion=(req,question) => { 
  var question=JSON.parse(question);
  /*var name=question.name;
  var wording=question.wording;
  var id_test_subcategory=question.id_test_subcategory;*/
  var value=question.value;
  var ordre=question.ordre;
  var question_id=req.query.id;
  return new Promise((resolve, reject) => { 
           var msg="";
           var sql = "UPDATE question SET value=?,ordre=?  WHERE id = ?"; 
           con.query(sql,[value,ordre,question_id], function (err, result) {
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

_publics.deleteQuestion = (req) => { 
  var question_id=req.query.id;
 return new Promise((resolve, reject) => {  
          var sql = "DELETE FROM question WHERE id = ?"; 
          var msg="";
          con.query(sql,[question_id], function (err, result) {
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

_publics.getAllQuestions = (req) => { 
  
  return new Promise((resolve, reject) => {  
           var sql = "select q.*, t.name as test, sc.name as subcategory  FROM question q left join test_subcategory tsc on(q.id_test_subcategory=tsc.id) left join subcategory sc on(sc.id=tsc.id_subcategory) left join test t on(t.id=tsc.id_test) order by id DESC"; 
         
               con.query(sql, function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};

_publics.getAllQuestionsByIdTestSubcategory = (req) => { 
 var idTestSubcategory=req.query.idTestSubcategory;
    return new Promise((resolve, reject) => {  
             var sql = "select q.* FROM question q left join test_subcategory ts on (ts.id=q.id_test_subcategory) where ts.id=? order by ordre"; 
           
                 con.query(sql,[idTestSubcategory], function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
     });    
  };


  _publics.getAllQuestionsByQuestionsIds = (questions) => { 
    let promises = [];
    for (var i=0;i<JSON.parse(questions).length;i++) {
     
      promises.push( new Promise((resolve, reject) => request.get({
        url :url+`/admin/getAnswersPerQuestion?id=${JSON.parse(questions)[i].id}`,
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
  
  
  _publics.getSubcategoryByTestSubcategory = (req) => { 
    var idTestSubcategory=req.query.idTestSubcategory;
       return new Promise((resolve, reject) => {  
                var sql = "select * FROM subcategory sc left join test_subcategory ts on (sc.id=ts.id_subcategory) where ts.id=?"; 
              
                    con.query(sql,[idTestSubcategory], function (err, result) {
                    if (err) reject(err);
                    return resolve(JSON.stringify(result));
                    });
        });    
     };

_publics.getQuestionById = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM question where id=?"; 
               con.query(sql,[id], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result[0]));
               });
   });    
};

//Answer controller
_publics.createAnswer = (answer ) => { 
  var answer=JSON.parse(answer);
  var id_question=answer.id_question;
  var name=answer.name;
  var value=answer.value;
  var ordre =answer.ordre;
  return new Promise((resolve, reject) => {  
           var msg="";
           var sql = "INSERT INTO answer SET ? ";
           const newAnswer = { id_question: id_question,name:name,value:value,ordre:ordre};
           con.query(sql,newAnswer, function (err, result) {
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
_publics.createAnswers = (questionId, answers ) => { 

  let promises = [];
  for (var i in answers) {
    promises.push(new Promise((resolve, reject) => {
      var msg="";
      var sql = "INSERT INTO answer SET ? ";
      const answer = { id_question:questionId,name:answers[i].name,value:answers[i].value,ordre:answers[i].ordre};
      con.query(sql,answer, function (err, result) {
         if (err){
             msg="failure";
             reject(err);
           }else{
             msg="success";
           }
       return resolve(msg);
      });
    }
    ));
  }
  return Promise.all(promises)      
}; 



_publics.updateAnswer=(req,answer) => { 
  var answer=JSON.parse(answer);
  var id_question=answer.id_question;
  var name=answer.name;
  var value=answer.value;
  var ordre =answer.ordre;
  var answer_id=req.query.id;
  return new Promise((resolve, reject) => { 
           var msg="";
           var sql = "UPDATE answer SET name=?,value=?,ordre=?  WHERE id = ?"; 
           con.query(sql,[name,value,ordre,answer_id], function (err, result) {
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

_publics.deleteAnswer = (req) => { 
  var answer_id=req.query.id;
 return new Promise((resolve, reject) => {  
          var sql = "DELETE FROM answer WHERE id = ?"; 
          var msg="";
          con.query(sql,[answer_id], function (err, result) {
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

_publics.getAllAnswerByQuestion = (req) => { 
  var id_question=req.query.id_question;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM answer where id_question=?  ";     
               con.query(sql,[id_question], function (err, result) {
                  if (err) reject(err);
                  return resolve(JSON.stringify(result));
               });
   });    
};


_publics.getAllAnswersByQuestions = (req,questions,res) => {
    let promises = []
  for(var i=0;i<JSON.parse(questions).length;i++){
    var id_question=JSON.parse(questions)[i].id;
    res.id=id_question;
    res.i=i;
      promises.push( new Promise((resolve, reject) => request.get({
         
          
          url :url+`/admin/getAllAnswerByQuestionId?id_question=${JSON.parse(questions)[i].id}`,
          method: 'GET',
          gzip: true,
        }, (e, r, b) => {
          if (!e && r.statusCode == 200) {
    
            return resolve(b);
          } else {
            reject(e);
          }
        })));
  }
  return Promise.all(promises)
};
_publics.getAnswerById = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM answer where id=?";          
               con.query(sql,[id], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result[0]));
               });
   });    
};


//Test Controller

_publics.getTestById = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM test where id=?";         
               con.query(sql,[id], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result[0]));
               });
   });    
};

_publics.getAllTests = (req) => {  
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM test order by id DESC";          
               con.query(sql, function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};
_publics.getAllActiveTests = () => { 
    var date=new Date;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM test where activation_date <=? and expiration_date>?";        
               con.query(sql,[date,date], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};
_publics.getAllDisabledTests = (req) => { 
  var date=new Date;
return new Promise((resolve, reject) => {  
         var sql = "select * FROM test where expiration_date<?";        
             con.query(sql,[date], function (err, result) {
             if (err) reject(err);
             return resolve(JSON.stringify(result));
             });
 });    
};
_publics.createTest = (test) => { 
      var test=JSON.parse(test)
      var name=test.name;
      var test_subcategories_number=test.test_subcategories_number;
      var password =test.password;
      var activation_date=test.activation_date;
      var expiration_date=test.expiration_date;
     
      activation_date=activation_date.replace(/T/, ' ').replace(/\..+/, '');
      expiration_date=expiration_date.replace(/T/, ' ').replace(/\..+/, '');

      var duration=test.duration;
      return new Promise((resolve, reject) => { 
      var msg="";
      var sql = "insert into test set ? ";
      const newTest = { name: name,test_subcategories_number:test_subcategories_number,password:password,activation_date:activation_date,expiration_date:expiration_date,duration:duration};         
      con.query(sql,newTest, function (err, result) {
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

_publics.updateTest= (req,test) => { 
      var test=JSON.parse(test);
      var name=test.name;
      var test_subcategories_number=test.test_subcategories_number;
      var password =test.password;
      var activation_date=test.activation_date;
      var expiration_date=test.expiration_date;
      activation_date=activation_date.replace(/T/, ' ').replace(/\..+/, '');
      expiration_date=expiration_date.replace(/T/, ' ').replace(/\..+/, '');
      
      var duration=test.duration;
      var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "update  test set name=?,test_subcategories_number=?,password=?,activation_date=?,expiration_date=?,duration=? where id=?";
             con.query(sql,[name,test_subcategories_number,password,activation_date,expiration_date,duration,id], function (err, result) {
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


 _publics.deleteTest = (req) => { 
    var id=req.query.id;
    return new Promise((resolve, reject) => { 
             var msg=""; 
             var sql = "delete from   test where id=?";
             con.query(sql,[id], function (err, result) {
              if (err){
                msg="failure";
              }else{
                msg="success";
              }
              return resolve(msg);
             });
           });    
 }; 


 function ceateTestCategory(testId, categoryId){
  var msg="";
  return new Promise((resolve, reject) => {
      var sql = "INSERT INTO test_category SET? ";
      con.query(sql,{id_test:testId,id_category:categoryId}, function (err, affectation) {
        if (err){
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
          response=ceateTestCategory(testId, categoriesList[i]);
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
          response=ceateTestsubcategory(testId, subcategoriesList[i], questionsNumber, wording);
          return resolve(response);
      }
  ));
  }
  return Promise.all(promises)
}


_publics.removeAffectationSubcategoryToTest=(testId, subcategoryId) => {
  var bool=false;
  return new Promise((resolve, reject) => {
    var msg="";
      var sql = "delete from test_subcategory where id_test=? and id_subcategory=? ";
      con.query(sql,[testId,subcategoryId], function (err, result) {
        if (err){
          msg="failed";
        }else{
          msg="success";
        }     
        return resolve(msg);
      });   
    });
}

_publics.AffectSubcategoryToTest = (testId, subcategoryId) => {
  var msg="";
  return new Promise((resolve, reject) => {
      var sql = "INSERT INTO test_subcategory SET? ";
      con.query(sql,{id_test:testId,id_subcategory:subcategoryId}, function (err, affectation) {
        if (err){
          msg="failed"; 
          }else{
            msg="success";  
          }
          return resolve(msg);
      });   
    });
}

_publics.removeAffectationCategoriesToTest = (testId, categoriesList) => {
  let promises = [];
  let response;
  for(var i=0;i<categoriesList.length;i++){
      promises.push( new Promise((resolve, reject) => {
          response=removeTestCategory(testId, categoriesList[i]);
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
          response=removeTestSubcategory(testId, subcategoriesList[i]);
          return resolve(response);
      }
  ));
  }
  return Promise.all(promises)
}
 

_publics.getTestCategoryByTestId = (testId) => { 

  return new Promise((resolve, reject) => { 
  var sql = "select * from test_category where id_test=?";
  con.query(sql,[testId], function (err, result) {
          if (err){
            reject(err);
          }else{         
            return resolve(result);
          }
          
     });
});      
}; 

_publics.getTestSubcategoriesByTestId = (testId) => { 
  perf.start();
  return new Promise((resolve, reject) => { 
  var sql = "select * from test_subcategory where id_test=? order by ordre";
  con.query(sql,[testId], function (err, result) {
          if (err){
            reject(err);
          }else{         
            return resolve(result);
          }
          
     });
});      
}; 

_publics.getTestSubcategoriesById = (idTestSubcategory) => { 

  return new Promise((resolve, reject) => { 
  var sql = "select * from test_subcategory where id=?";
  con.query(sql,[idTestSubcategory], function (err, result) {
          if (err){
            reject(err);
          }else{         
            return resolve(result);
          }
          
     });
});      
}; 



_publics.getQuestionsByTestSubcategories = (testSubcategories ) => { 
  
  let promises = [];
  for (var i=0;i<testSubcategories.length;i++) {
    promises.push(new Promise((resolve, reject) => {
      var sql = "select * from question where id_test_subcategory= ? ";
      con.query(sql,testSubcategories[i].id, function (err, result) {
        if (err){
          reject(err);
        }else{     
          return resolve(result);
        }
        
      });
    }
    ));
  }
  return Promise.all(promises)      
}; 

_publics.getAnswersByQuestions = (questions ) => { 
  let promises = [];
  for (var i=0;i<questions.length;i++) {
    promises.push(new Promise((resolve, reject) => {
      var sql = "select * from answer where id_question= ? ";
      con.query(sql,questions[i].id, function (err, result) {
        if (err){
          reject(err);
        }else{         
          return resolve(result);
        }
        
      });
    }
    ));
  }
  return Promise.all(promises)      
}; 

_publics.duplicateTest = (testName,test) => { 
  
  //var name=test.name;
  var name=testName;
  var test_subcategories_number=test.test_subcategories_number;
  var password =test.password;
  var activation_date=test.activation_date;
  var expiration_date=test.expiration_date;
  activation_date=activation_date.replace(/T/, ' ').replace(/\..+/, '');
  expiration_date=expiration_date.replace(/T/, ' ').replace(/\..+/, '');
  var duration=test.duration;


  return new Promise((resolve, reject) => { 
  var response={};
  var sql = "insert into test set ? ";
  const newTest = { name: name,test_subcategories_number:test_subcategories_number,password:password,activation_date:activation_date,expiration_date:expiration_date,duration:duration};         
  con.query(sql,newTest, function (err, result) {
        if (err){
          response={
            msg:"failure"
          }
            reject(err);
          }else{
            response={
              msg:"success",
              testId:result.insertId
            }
          }
          return resolve(response);
     });
});      
}; 


_publics.duplicateTestCategory = (testCategories, testId ) => { 
  let promises = [];
  for (var i=0; i<testCategories.length;i++) {
    promises.push(new Promise((resolve, reject) => {
      var msg="";
      var response={};
      var sql = "INSERT INTO test_category SET? ";
      con.query(sql,{id_category:testCategories[i].id_category,id_test:testId}, function (err, result) {
        if (err){
          reject(err);
        }else{     
          return resolve(result);
        }
       
      });
    }
    ));
  }
  return Promise.all(promises)      
}; 


_publics.duplicateTestSubCategory = (testSubcategory,testId ) => { 
 
    return new Promise((resolve, reject) => {
      var msg="";
      var response={};
      var sql = "INSERT INTO test_subcategory SET ?";
      con.query(sql,{id_category:testSubcategory.id_category,id_subcategory:testSubcategory.id_subcategory,id_test:testId,questions_number:testSubcategory.questions_number,wording:testSubcategory.wording}, function (err, result) {
        if (err){
          response={
            msg:"failure"
          }
            reject(err);
          }else{
            response={
              msg:"success",
              testSubCategId:result.insertId
            }
          }
          return resolve(response);
      });
    }
    );
     
}; 



_publics.duplicateTestSubCategories = ( res, testSubcategories,testId ) => { 
  let promises = [];
  for (var i=0; i<testSubcategories.length;i++) {
    promises.push(new Promise((resolve, reject) => {
      var response=duplicateTestSubCategories( res, testSubcategories[i], testId);
     return resolve(response);
    }
    ));
  }
  return Promise.all(promises)
   
}; 

function duplicateTestSubCategories( res, testSubcategory, testId ) { 
  return new Promise((resolve, reject) => { 
    var response=duplicateTestSubCategory(testSubcategory.testSubcategory, testId);
        return resolve(response);
      })
        .then(message =>{
          return new Promise((resolve, reject) => { 
              if (message.msg === "success") {
                var response= duplicateQuestionAndAnswers(testSubcategory.testSubcategory.id, res, testSubcategory.questions,message.testSubCategId);
                return resolve(response);
              } else {
                return resolve("failure");
              }
          })
        })
        .then(message=>{
          return new Promise((resolve, reject) => { 
            return resolve(message);
          })
        });

}


 async function duplicateTestSubCategory(testSubcategory,testId ){
  return new Promise((resolve, reject) => {
    var msg="";
    var response={};
    var sql = "INSERT INTO test_subcategory SET ?";
    con.query(sql,{id_category:testSubcategory.id_category,id_subcategory:testSubcategory.id_subcategory,id_test:testId,questions_number:testSubcategory.questions_number,wording:testSubcategory.wording, ordre:testSubcategory.ordre}, function (err, result) {
      if (err){
        response={
          msg:"failure"
        }
          reject(err);
        }else{
          response={
            msg:"success",
            testSubCategId:result.insertId
          }
        }
        return resolve(response);
    });
  }
  );
   
}; 

function duplicateQuestionAndAnswers(idLasttestSubcategory, res, questions,testSubCategId){
    let promises = [];
    for (var i=0;i<questions.length;i++) {
        promises.push( new Promise((resolve, reject) => {       
            var response=createQuestionAndAnswers(idLasttestSubcategory,questions[i], testSubCategId, res );
            return resolve(response);
        }));
    }
    return Promise.all(promises);       
}

function createAnswers (questionId, answers ) { 
  if(answers[0]===undefined){
    return;
  }
  let promises = [];
  for (var i in answers) {
    promises.push(new Promise((resolve, reject) => {
      var msg="";
      var sql = "INSERT INTO answer SET ? ";
      const answer = { id_question:questionId,name:answers[i].name,value:answers[i].value,ordre:answers[i].ordre};
      con.query(sql,answer, function (err, result) {
         if (err){
             msg="failure";
             reject(err);
           }else{
             msg="success";
           }
           
       return resolve(msg);
      });
    }
    ));
  }
  return Promise.all(promises)      
}; 


function createQuestionAndAnswers(idLasttestSubcategory,input, testSubCategId, res ) { 
  return new Promise((resolve, reject) => { 
      getQuestionById(input)
      .then(question=>{
      return createQuestion(question, testSubCategId, res);
      })
      .then(message =>{

          if (message.msg === "success") {
            return createAnswers(message.questionId, input);
          } else {
              return "failure";
          }
      })
      .then(message=>{
        if(res.payload.leave===true){
          return resolve("failure");
        }else{
          return resolve("success");
        }

      });
  });
}

function getQuestionById(input){ 
  
  return new Promise((resolve, reject) => {  
    if(input[0]===undefined){
      return resolve(null);
    }
    var questionId=input[0].id_question;
           var sql = "select * FROM question where id=?"; 
               con.query(sql,[questionId], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result[0]));
               });
   });    
};

/*function createQuestionAndAnswers(input, req, res ) { 

  createQuestion(JSON.stringify(input), req, res)
  .then(message =>{
    console.log("create question ==>"+message.msg);
    if (message.msg === "success") {
      return createAnswers(message.questionId, JSON.parse(input).answers);
  } else {
       return "failure";
  }
  });

}*/






function createQuestion (question,testSubCategId, res ){ 
  var question=JSON.parse(question);
  return new Promise((resolve, reject) => {  
          if(question===null){
            return resolve("failure");
          }else{
              var response={};
               
              
              var name=question.name;
              var wording=question.wording;
              var value=question.value;  
              var id_test_subcategory=testSubCategId;
              var order=question.ordre; 
              var sql = "INSERT INTO question SET ? ";
              const newQuestion = { name: name,wording:wording,value:value,id_test_subcategory:id_test_subcategory,ordre:order};
              con.query(sql,newQuestion, function (err, result) {
                  if (err){
                    response={
                      msg:"failure"
                    }
                      reject(err);
                    }else{
                      response={
                        msg:"success",
                        questionId:result.insertId
                      }
                      
                    }
                return resolve(response);
              });
            }
  });   

      
};

_publics.duplicateQuestion = (question,testSubcategoryId ) => { 

    return new Promise((resolve, reject) => {
      var msg="";
      var response={};
      var sql = "INSERT INTO question SET ?";
      con.query(sql,{name:question.name,wording:question.wording,value:question.value,id_test_subcategory:testSubcategoryId}, function (err, result) {
        if (err){
          response={
            msg:"failure"
          }
            reject(err);
          }else{
            response={
              msg:"success",
              questionId:result.insertId
            }
          }
          return resolve(response);
      });
    }
    );
    
}; 



_publics.duplicateAnswer = (answer, questionId ) => { 

   return new Promise((resolve, reject) => {
      var msg="";
      var sql = "INSERT INTO answer SET ?";
      con.query(sql,{name:answer.name,value:answer.value,ordre:answer.ordre,id_question:questionId}, function (err, result) {
        if (err){
          response={
            msg:"failure"
          }
            reject(err);
          }else{
            response={
              msg:"success",
              questionId:result.insertId
            }
          }
          return resolve(response);
      });
    }
    );
    
}; 

//get test by date and class
_publics.getTestClassDateMember = (req) => { 
  var date=new Date;
  var id_clazz=req.query.id_clazz;
  var id_school=req.query.id_school;
  var id_member=req.query.id_member;
return new Promise((resolve, reject) => {  
         var sql = "select * from test_member tm left join test_clazz tc on (tm.id_test=tc.id_test) left join test t on (tm.id_test=t.id) left join test_school ts on (ts.id_test=tm.id_test) where tc.id_clazz=? and ts.id_school=? and activation_date < ? and expiration_date > ? and tm.id_member=?";        
             con.query(sql,[id_clazz,id_school,date,date,id_member], function (err, result) {
             if (err) reject(err);
             return resolve(JSON.stringify(result));
             });
 });    
};

//get test déjà fait 
_publics.getTestFait = (req) => { 
  var date=new Date;
  var id_clazz=req.query.id_clazz;
  var id_school=req.query.id_school;
  var id_member=req.query.id_member;
return new Promise((resolve, reject) => {  
         var sql = "select * from test_member tm left join test_clazz tc on (tm.id_test=tc.id_test) left join test t on (tm.id_test=t.id) left join test_school ts on (ts.id_test=tm.id_test) where tc.id_clazz=? and ts.id_school=? and tm.id_member=? and tm.date_test <?";        
             con.query(sql,[id_clazz,id_school,id_member,date], function (err, result) {
             if (err) reject(err);
             return resolve(JSON.stringify(result));
             });
 });    
};


//admin login
_publics.login = (admin) => {

  var status = "";
  var admin0 = JSON.parse(admin);
  var pseudo = admin0.pseudo;
  var password = admin0.password;

  return new Promise((resolve, reject) => {

    var sql = "select * FROM member where pseudo=? and password=? and role='admin' ";
    con.query(sql, [pseudo, password], function (err, admins) {
      var admins = JSON.stringify(admins);
      admins = JSON.parse(admins);

      if (err) {
          status= "500";
      } else if (admins[0] === undefined || (admins[0].password !== password)) {
        status= "403";
      } else {
        status= "200";
      }
      return resolve(status);
    });
  });
}

_publics.getNotEmptyAnswres = (answers) => { 
  var answerArray = [];
    return new Promise((resolve, reject) => {  
      for (var i = 0; i < answers.length; i++) {
          if (answers[i].length !== 0) {
              for (var j = 0; j < answers[i].length; j++) {
                  answerArray.push(answers[i][j]);
              }
          }
      }
      return resolve(answerArray);   
    });    
};
_publics.getNotEmptyQuestions = (questions) => { 
  var questionArray = [];
    return new Promise((resolve, reject) => {  
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].length !== 0) {
            for (var j = 0; j < questions[i].length; j++) {
                questionArray.push(questions[i][j]);
            }
        }
    }
      return resolve(questionArray);   
    });    

};
 

_publics.getAllQuestionsAnswers = (questions) => {
  let promises = []
  for(var i=0;i<questions.length;i++){ 
    var subquestion = questions[i];
    for(var j=0;j<subquestion.length;j++){ 
      promises.push( new Promise((resolve, reject) => request.get({
          url :url+`/admin/getAnswersPerQuestion?id=${subquestion[j].id}`,
          method: 'GET',
          gzip: true,
        }, (e, r, b) => {
          if (!e && r.statusCode == 200) {
            return resolve(b);
          } else {
             reject(e);
          }
          
        })));
      }
  }
  return Promise.all(promises)
};

_publics.getAllSubcategoriesByCategories = (categories,req) => { 
  let promises = [];
  for (var i=0;i<JSON.parse(categories).length;i++) {
    promises.push( new Promise((resolve, reject) => request.get({
      url :url+`/calcul/getSubcategoriesByCategory?id=${JSON.parse(categories)[i].category_id}&id_member=${req.query.id_member}`,
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



_publics.getAllQuestionsByTestSubcategories = (testSubcategories) => { 
  let promises = [];
  for (var i=0;i<testSubcategories.length;i++) {
    promises.push( new Promise((resolve, reject) => request.get({
      url :url+`/admin/getQuestionsByTestSubcategory?idTestSubcategory=${testSubcategories[i].id}`,
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



_publics.getAllQuestionsByTestSubc = (testSubcategories) => { 
  let promises = [];
  for (var i=0;i<testSubcategories.length;i++) {
    promises.push( new Promise((resolve, reject) => request.get({
      url :url+`/admin/getQuestionsByTestSubc?idTestSubcategory=${testSubcategories[i].id}`,
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





_publics.getQuestionsBySubcategories = (testSubcategories) => { 
  let promises = [];
  for (var i=0;i<testSubcategories.length;i++) {
    promises.push( new Promise((resolve, reject) => request.get({
      url :url+`/admin/getQuestionsByTestSubcategoryId?idTestSubcategory=${testSubcategories[i].id}`,
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




/*_publics.duplicateQuestionAndAnswers = (questions,testSubCategId) => { 
  let promises = [];
  for (var i=0;i<questions.length;i++) {
    var data=JSON.stringify(questions[i]);
    promises.push( 
      new Promise((resolve, reject) => request.post({
     url :url+`/admin/createQuestionAndAnswers?testSubCategId=${testSubCategId}`,
     method: 'POST',
     gzip: true,
     json: true,
     rejectUnauthorized: false,
     headers: {
       'Content-Type': 'application/json',
       'Content-Length': Buffer.byteLength(data),
       //'Content-Length': Buffer.byteLength("{\"questions\":[{\"question\":{\"id\":1,\"name\":\"question1\",\"wording\":\"frensh\",\"value\":1,\"id_test_subcategory\":1},\"answers\":[{\"id\":1,\"id_question\":1,\"value\":\"1\",\"name\":\"Dymanique\",\"ordre\":1},{\"id\":2,\"id_question\":1,\"value\":\"1\",\"name\":\"Energique\",\"ordre\":2}]},"+
      //"{\"questions\":[{\"question\":{\"id\":1,\"name\":\"question1\",\"wording\":\"frensh\",\"value\":1,\"id_test_subcategory\":1},\"answers\":[{\"id\":1,\"id_question\":1,\"value\":\"1\",\"name\":\"Dymanique\",\"ordre\":1},{\"id\":2,\"id_question\":1,\"value\":\"1\",\"name\":\"Energique\",\"ordre\":2}]}]}")
   }
   }, (e, r, b) => {
     if (!e && r.statusCode == 200) {
       console.log("yessssssssssssssss");
       return resolve(JSON.parse(b));
     } else {
       console.log("errreuuuuuuuuuuuuur "+r.statusCode+" eroor= "+e);
       reject(e);
     }
   }))
   );
  }
  return Promise.all(promises)      

};*/

_publics.duplicateQuestionAndAnswers = (req, res, questions,testSubCategId) => {
  req.query.testSubCategId= testSubCategId;
  let promises = [];
  for (var i=0;i<questions.length;i++) {
      promises.push( new Promise((resolve, reject) => {  
          var response=createQuestionAndAnswers(JSON.stringify(questions[i]), req, res );
          return resolve(response);
      }));
  }
  return Promise.all(promises);     

};



_publics.getSubCategoriesByTestId = (req) => {
  return new Promise((resolve, reject) => {   
    var sql = "select sc.* from subcategory sc left join  test_subcategory tsc on(sc.id=tsc.id_subcategory)  where tsc.id_test=?";        
    con.query(sql,[req.query.testId], function (err, result) {
    if (err) reject(err);
    return resolve(result);
    });
 });  

}

_publics.getCategoriesByTestId = (req) => {
  return new Promise((resolve, reject) => {   
    var sql = "select c.* from category c left join  test_category tc on(c.id=tc.id_category)  where tc.id_test=?";        
    con.query(sql,[req.query.testId], function (err, result) {
    if (err) reject(err);
    return resolve(result);
    });
 });  

}



_publics.getTestsByFilter = (req) => {
  return new Promise((resolve, reject) => {   
    var sql = "select t.name, tm.date_test, m.firstname, m.lastname, c.name as class, s.name as school from test t left join test_member tm on(t.id=tm.id_test) left join member m on(m.id=tm.id_member) "
     +"left join clazz c on(m.id_clazz=c.id) left join school s on(m.id_school=s.id) where 5=5";        
    sql=whereClause(req, sql);
    con.query(sql,[req.query.testId], function (err, result) {
    if (err) reject(err);
    return resolve(result);
    });
 });  

}

function whereClause(req, sql) {
  if(req.query.beginDate!==undefined && req.query.beginDate!==''){
    sql+=" and tm.date_test>='"+req.query.beginDate+"'";
  }
  if(req.query.endDate!==undefined && req.query.endDate!==''){
    sql+=" and tm.date_test<='"+req.query.endDate+"'";
  }
  if(req.query.minAge!==undefined && req.query.minAge!==''){
    sql+=" and m.age>='"+req.query.minAge+"'";
  }
  if(req.query.maxAge!==undefined && req.query.maxAge!==''){
    sql+=" and m.age<='"+req.query.maxAge+"'";
  }
  return sql;
}



_publics.createDefaultTestResult = (questions,idTestMember) => {
  let promises = [];
  for (var i=0;i<questions.length;i++) {
      promises.push( new Promise((resolve, reject) => {  
          let quest=questions[i].questions;
          var response=createDefaultMemberChoices(quest,idTestMember);
          return resolve(response);
      }));
  }
  return Promise.all(promises);  

}

function createDefaultMemberChoices(quest,idTestMember){
  let promises = [];
  for (var j=0;j<quest.length;j++) {
      promises.push( new Promise((resolve, reject) => {  
        var msg="";
        var sql = "INSERT INTO choice_member SET ? ";
        var firstQuestion =quest[j][1];
       
        const defaultResponse = { id_question:firstQuestion.id_question ,id_answer:firstQuestion.id,id_test_member:idTestMember};
        con.query(sql,defaultResponse, function (err, result) {
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
  return Promise.all(promises); 
}











_publics.getSubcategoryByMemberAndTestID = (req) => { 
  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
     return new Promise((resolve, reject) => {  
              var sql = "select sc.name as section, ma.etallonage_result as calculated_result from manuel_answer ma left join subcategory sc on(sc.id=ma.id_subcategory) left join category c on (c.id=sc.id_category)  where ma.id_test=? and ma.id_member=?"; 
            
                  con.query(sql,[id_test,id_member], function (err, result) {
                  if (err) reject(err);
                  return resolve(JSON.stringify(result));
                  });
      });    
   };


   _publics.getMemberInformationByMemberAndTestID = (req) => { 
    var id_test=req.query.id_test;
    var id_member=req.query.id_member;
       return new Promise((resolve, reject) => {  
                var sql = "select distinct m.firstname as prenom , m.lastname as nom , m.age as age from member m left join manuel_answer ma on (ma.id_member = m.id ) where ma.id_test=? and ma.id_member=?"; 
              
                    con.query(sql,[id_test,id_member], function (err, result) {
                    if (err) reject(err);
                    return resolve(JSON.stringify(result));
                    });
        });    
     };

     //xml
     _publics.getSubcategoryResultByMemberAndTestID =(id_test,id_member) =>{ 
         return new Promise((resolve, reject) => {  
                  var sql = "select distinct  ma.etallonage_result,s.name from member m left join manuel_answer ma on(ma.id_member=m.id) left join test_subcategory ts on(ts.id_subcategory=ma.id_subcategory) left join subcategory s on(s.id=ts.id_subcategory) where ma.id_test=? and ma.id_member=?";
                      con.query(sql,[id_test,id_member], function (err, result) {
                      if (err) reject(err);
                      return resolve(result);
                      });
          });    
       };
    
       _publics.getMembersResults = (members, testId) => { 
        let promises = [];
        for (var i=0;i<JSON.parse(members).length;i++) {
          promises.push( new Promise((resolve, reject) => request.get({
            url :url+`/admin/getMemberResult?id_test=${testId}&id=${JSON.parse(members)[i].id}`,
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
       
      

     _publics.getSubcategoriesByTestID = (req) => { 
      var id_test=req.query.id_test;
      
         return new Promise((resolve, reject) => {  
                  var sql = " select distinct  s.name from member m left join manuel_answer ma on(ma.id_member=m.id) left join test_subcategory ts on(ts.id_subcategory=ma.id_subcategory) left join subcategory s on(s.id=ts.id_subcategory) where ma.id_test=?";

                      con.query(sql,[id_test], function (err, result) {
                      if (err) reject(err);
                      return resolve(JSON.stringify(result));
                      });
          });    
     };


  _publics.getMembersInformationByTestID = (req) => { 
      var id_test=req.query.id_test;
      
         return new Promise((resolve, reject) => {  
                  var sql = "select distinct  m.id ,m.firstname,m.lastname,m.age from member m left join manuel_answer ma on(ma.id_member=m.id) left join test_subcategory ts on(ts.id_subcategory=ma.id_subcategory) left join subcategory s on(s.id=ts.id_subcategory) where ma.id_test=? "; 
                
                      con.query(sql,[id_test], function (err, result) {
                      if (err) reject(err);
                      return resolve(JSON.stringify(result));
                      });
          });    
     };

     //fin xml

     function createResultSubCat(data5 , subcategories , memberResult){
      let promises = [];
    
        for (var j=0 ; j<memberResult.length ; i++){
          for(var k=0;k<subcategories.length;k++){
          promises.push( new Promise((resolve, reject) => { 
            
          
          if (((memberResult[j].name).toString().trim()) === ((subcategories[k].name).toString().trim())){
          data5.txt(memberResult[j].etallonage_result) ;}
        
        }));
      }
    }
      
      return Promise.all(promises);   
    
    }
    
     
     function createRow(row , subcategories , memberResult){
      let promises = [];
     
     for (var i=0;i<subcategories.length;i++) {
        promises.push( new Promise((resolve, reject) => {         
          var subcategory =row.ele('Cell');
          subcategory.att('ss:StyleID' , 'Default');
          var data5 =  subcategory.ele('Data');
              data5.att('ss:Type', 'String'); 
              
               ///createResultSubCat(data5 , subcategories , memberResult)
             //data5.txt(memberResult[i]===null ? " " : memberResult[i].etallonage_result) ; 
              data5.txt(memberResult[i].etallonage_result) ; 
              
            data5.up();
          subcategory.up();          
          }));
      }
      
      return Promise.all(promises);   
    
    }
    
  

_publics.generateXMLFile = (input,req , res  ) => {
  return new Promise((resolve, reject) => {   

    
  
    var builder = require('xmlbuilder');
    var doc = builder.create('Workbook');
    
    doc.att('xmlns:o', 'urn:schemas-microsoft-com:office:office');
    doc.att('xmlns:x', 'urn:schemas-microsoft-com:office:excel');
    doc.att('xmlns:ss', 'urn:schemas-microsoft-com:office:spreadsheet');
    doc.att('xmlns', 'urn:schemas-microsoft-com:office:spreadsheet');
    doc.att('xmlns:x2', 'urn:schemas-microsoft-com:office:excel2');
    var styles =doc.ele('Styles');



    
  //styles of categories part

     var style1 = styles.ele('Style');
        style1.att('ss:ID', 'Default');
        style1.att('ss:Name', 'Normal');
        var alignement =style1.ele('ss:Alignment');
        alignement.att('ss:Vertical', 'Bottom');
        alignement.up();
        var font = style1.ele('ss:Font');
        font.att('ss:Color', '#000000');
        font.att('ss:FontName', 'Arial');
        font.att('ss:Size', '10');
        font.up();
        style1.up();
      
      var style2 = styles.ele('Style');
        style2.att('ss:ID', 'S21');
          var interior = style2.ele('Interior');
             interior.att('ss:Color', '#FFFFF0');
             interior.att('ss:Pattern', 'Solid');
           interior.up();
          var alignement2= style2.ele('ss:Alignment');
            alignement2.att('ss:Vertical', 'Bottom');
            alignement2.up();
          var borders2 = style2.ele('ss:Borders');
             var border = borders2.ele('ss:Border');
                 border.att('ss:Position', 'Left');
                 border.att('ss:Color', '#000000');
                 border.att('ss:LineStyle' , 'Continuous');
                 border.att('ss:Weight' , '1');
              border.up();
              var border1 = borders2.ele('ss:Border');
                border1.att('ss:Position', 'Top');
                border1.att('ss:Color', '#000000');
                border1.att('ss:LineStyle' , 'Continuous');
                border1.att('ss:Weight' , '1');
              border1.up();
              var border2 = borders2.ele('ss:Border');
                border2.att('ss:Position', 'Bottom');
                border2.att('ss:Color', '#000000');
                border2.att('ss:LineStyle' , 'Continuous');
                border2.att('ss:Weight' , '1');
              border2.up();
           borders2.up();
            var font2 = style2.ele('ss:Font');
            font2.att('ss:Color', '#000000');
            font2.att('ss:FontName', 'Arial');
            font2.att('ss:Size', '10');
            font2.up();
            var numberFormat=style2.ele('ss:NumberFormat')
            numberFormat.att('ss:Format', '@')
            numberFormat.up();
       style2.up();



       var style3 = styles.ele('Style');
        style3.att('ss:ID', 'S22');
          var interior = style3.ele('Interior');
             interior.att('ss:Color', '#FFFFF0');
             interior.att('ss:Pattern', 'Solid');
           interior.up();
          var alignement2= style3.ele('ss:Alignment');
            alignement2.att('ss:Vertical', 'Bottom');
            alignement2.up();
          var borders2 = style3.ele('ss:Borders');
              var border1 = borders2.ele('ss:Border');
                border1.att('ss:Position', 'Top');
                border1.att('ss:Color', '#000000');
                border1.att('ss:LineStyle' , 'Continuous');
                border1.att('ss:Weight' , '1');
              border1.up();
              var border2 = borders2.ele('ss:Border');
                border2.att('ss:Position', 'Bottom');
                border2.att('ss:Color', '#000000');
                border2.att('ss:LineStyle' , 'Continuous');
                border2.att('ss:Weight' , '1');
              border2.up();
           borders2.up();
            var font2 = style3.ele('ss:Font');
            font2.att('ss:Color', '#000000');
            font2.att('ss:FontName', 'Arial');
            font2.att('ss:Size', '10');
            font2.up();
       style3.up();

       var style4 = styles.ele('Style');
        style4.att('ss:ID', 'S23');
          var interior = style4.ele('Interior');
             interior.att('ss:Color', '#FFFFF0');
             interior.att('ss:Pattern', 'Solid');
           interior.up();
          var alignement2= style4.ele('ss:Alignment');
            alignement2.att('ss:Vertical', 'Bottom');
            alignement2.up();
          var borders2 = style4.ele('ss:Borders');
              var border1 = borders2.ele('ss:Border');
                border1.att('ss:Position', 'Top');
                border1.att('ss:Color', '#000000');
                border1.att('ss:LineStyle' , 'Continuous');
                border1.att('ss:Weight' , '1');
              border1.up();
              var border2 = borders2.ele('ss:Border');
                border2.att('ss:Position', 'Bottom');
                border2.att('ss:Color', '#000000');
                border2.att('ss:LineStyle' , 'Continuous');
                border2.att('ss:Weight' , '1');
              border2.up();
           borders2.up();
            var font2 = style4.ele('ss:Font');
            font2.att('ss:Color', '#000000');
            font2.att('ss:FontName', 'Arial');
            font2.att('ss:Size', '10');
            font2.up();
       style4.up();


       var style5 = styles.ele('Style');
       style5.att('ss:ID', 'S24');
         var interior = style5.ele('Interior');
            interior.att('ss:Color', '#FFFFF0');
            interior.att('ss:Pattern', 'Solid');
          interior.up();
         var alignement2= style5.ele('ss:Alignment');
           alignement2.att('ss:Vertical', 'Bottom');
           alignement2.up();
         var borders2 = style5.ele('ss:Borders');

            var border = borders2.ele('ss:Border');
              border.att('ss:Position', 'Right');
              border.att('ss:Color', '#000000');
              border.att('ss:LineStyle' , 'Continuous');
              border.att('ss:Weight' , '1');
            border.up();
             var border1 = borders2.ele('ss:Border');
               border1.att('ss:Position', 'Top');
               border1.att('ss:Color', '#000000');
               border1.att('ss:LineStyle' , 'Continuous');
               border1.att('ss:Weight' , '1');
             border1.up();
             var border2 = borders2.ele('ss:Border');
               border2.att('ss:Position', 'Bottom');
               border2.att('ss:Color', '#000000');
               border2.att('ss:LineStyle' , 'Continuous');
               border2.att('ss:Weight' , '1');
             border2.up();
          borders2.up();
           var font2 = style5.ele('ss:Font');
           font2.att('ss:Color', '#000000');
           font2.att('ss:FontName', 'Arial');
           font2.att('ss:Size', '10');
           font2.up();
      style5.up();



      var style6 = styles.ele('Style');
      style6.att('ss:ID', 'S25');
        var interior = style6.ele('Interior');
           interior.att('ss:Color', '#FFFFF0');
           interior.att('ss:Pattern', 'Solid');
         interior.up();
        var alignement2= style6.ele('ss:Alignment');
          alignement2.att('ss:Vertical', 'Bottom');
          alignement2.up();
        var borders2 = style6.ele('ss:Borders');

           var border = borders2.ele('ss:Border');
             border.att('ss:Position', 'Left');
             border.att('ss:Color', '#000000');
             border.att('ss:LineStyle' , 'Continuous');
             border.att('ss:Weight' , '1');
           border.up();
            var border1 = borders2.ele('ss:Border');
              border1.att('ss:Position', 'Right');
              border1.att('ss:Color', '#000000');
              border1.att('ss:LineStyle' , 'Continuous');
              border1.att('ss:Weight' , '1');
            border1.up();
            var border2 = borders2.ele('ss:Border');
              border2.att('ss:Position', 'Bottom');
              border2.att('ss:Color', '#000000');
              border2.att('ss:LineStyle' , 'Continuous');
              border2.att('ss:Weight' , '1');
            border2.up();
         borders2.up();
          var font2 = style6.ele('ss:Font');
          font2.att('ss:Color', '#000000');
          font2.att('ss:FontName', 'Arial');
          font2.att('ss:Size', '10');
          font2.up();
        style6.up();



            
        //styles of  subcategories part

          var style12 = styles.ele('Style');
          style12.att('ss:ID', 'ST21');
          var interior = style12.ele('Interior');
          interior.att('ss:Color', '#F08080');
          interior.att('ss:Pattern', 'Solid');
          interior.up();
          var alignement =style12.ele('ss:Alignment');
          alignement.att('ss:Vertical', 'Bottom');
          alignement.up();
          var borders2 = style12.ele('ss:Borders');
           var border = borders2.ele('ss:Border');
             border.att('ss:Position', 'Left');
             border.att('ss:Color', '#000000');
             border.att('ss:LineStyle' , 'Continuous');
             border.att('ss:Weight' , '1');
           border.up();
            var border1 = borders2.ele('ss:Border');
              border1.att('ss:Position', 'Top');
              border1.att('ss:Color', '#000000');
              border1.att('ss:LineStyle' , 'Continuous');
              border1.att('ss:Weight' , '1');
            border1.up();
            var border2 = borders2.ele('ss:Border');
              border2.att('ss:Position', 'Bottom');
              border2.att('ss:Color', '#000000');
              border2.att('ss:LineStyle' , 'Continuous');
              border2.att('ss:Weight' , '1');
            border2.up();
         borders2.up();
          var font = style12.ele('ss:Font');
          font.att('ss:Color', '#000000');
          font.att('ss:FontName', 'Arial');
          font.att('ss:Size', '10');
          font.up();
          style12.up();
        
        var style22 = styles.ele('Style');
          style22.att('ss:ID', 'ST22');
            var interior = style22.ele('Interior');
                interior.att('ss:Color', '#F08080');
                interior.att('ss:Pattern', 'Solid');
              interior.up();
            var alignement2= style22.ele('ss:Alignment');
              alignement2.att('ss:Vertical', 'Bottom');
              alignement2.up();
            var borders2 = style22.ele('ss:Borders');
                var border1 = borders2.ele('ss:Border');
                  border1.att('ss:Position', 'Top');
                  border1.att('ss:Color', '#000000');
                  border1.att('ss:LineStyle' , 'Continuous');
                  border1.att('ss:Weight' , '1');
                border1.up();
                var border2 = borders2.ele('ss:Border');
                  border2.att('ss:Position', 'Bottom');
                  border2.att('ss:Color', '#000000');
                  border2.att('ss:LineStyle' , 'Continuous');
                  border2.att('ss:Weight' , '1');
                border2.up();
              borders2.up();
              var font2 = style22.ele('ss:Font');
              font2.att('ss:Color', '#000000');
              font2.att('ss:FontName', 'Arial');
              font2.att('ss:Size', '10');
              font2.up();
              var numberFormat=style22.ele('ss:NumberFormat')
              numberFormat.att('ss:Format', '@')
              numberFormat.up();
          style2.up();



          var style32 = styles.ele('Style');
          style32.att('ss:ID', 'ST23');
            var interior = style32.ele('Interior');
                interior.att('ss:Color', '#F08080');
                interior.att('ss:Pattern', 'Solid');
              interior.up();
            var alignement2= style32.ele('ss:Alignment');
              alignement2.att('ss:Vertical', 'Bottom');
              alignement2.up();
            var borders2 = style32.ele('ss:Borders');
           
                var border1 = borders2.ele('ss:Border');
                  border1.att('ss:Position', 'Top');
                  border1.att('ss:Color', '#000000');
                  border1.att('ss:LineStyle' , 'Continuous');
                  border1.att('ss:Weight' , '1');
                border1.up();
                var border2 = borders2.ele('ss:Border');
                  border2.att('ss:Position', 'Bottom');
                  border2.att('ss:Color', '#000000');
                  border2.att('ss:LineStyle' , 'Continuous');
                  border2.att('ss:Weight' , '1');
                border2.up();
              borders2.up();
              var font2 = style32.ele('ss:Font');
              font2.att('ss:Color', '#000000');
              font2.att('ss:FontName', 'Arial');
              font2.att('ss:Size', '10');
              font2.up();
          style32.up();

          var style42 = styles.ele('Style');
          style42.att('ss:ID', 'ST24');
            var interior = style42.ele('Interior');
                interior.att('ss:Color', '#F08080');
                interior.att('ss:Pattern', 'Solid');
              interior.up();
            var alignement2= style42.ele('ss:Alignment');
              alignement2.att('ss:Vertical', 'Bottom');
              alignement2.up();
            var borders2 = style42.ele('ss:Borders');
            var border = borders2.ele('ss:Border');
                border.att('ss:Position', 'Right');
                border.att('ss:Color', '#000000');
                border.att('ss:LineStyle' , 'Continuous');
                border.att('ss:Weight' , '1');
                border.up();
                var border1 = borders2.ele('ss:Border');
                  border1.att('ss:Position', 'Top');
                  border1.att('ss:Color', '#000000');
                  border1.att('ss:LineStyle' , 'Continuous');
                  border1.att('ss:Weight' , '1');
                border1.up();
                var border2 = borders2.ele('ss:Border');
                  border2.att('ss:Position', 'Bottom');
                  border2.att('ss:Color', '#000000');
                  border2.att('ss:LineStyle' , 'Continuous');
                  border2.att('ss:Weight' , '1');
                border2.up();
              borders2.up();
              var font2 = style42.ele('ss:Font');
              font2.att('ss:Color', '#000000');
              font2.att('ss:FontName', 'Arial');
              font2.att('ss:Size', '10');
              font2.up();
          style42.up();


          var style52 = styles.ele('Style');
          style52.att('ss:ID', 'ST25');
            var interior = style52.ele('Interior');
              interior.att('ss:Color', '#F08080');
              interior.att('ss:Pattern', 'Solid');
            interior.up();
            var alignement2= style52.ele('ss:Alignment');
              alignement2.att('ss:Vertical', 'Bottom');
              alignement2.up();
            var borders2 = style52.ele('ss:Borders');

              var border = borders2.ele('ss:Border');
                border.att('ss:Position', 'Left');
                border.att('ss:Color', '#000000');
                border.att('ss:LineStyle' , 'Continuous');
                border.att('ss:Weight' , '1');
              border.up();
                var border1 = borders2.ele('ss:Border');
                  border1.att('ss:Position', 'Right');
                  border1.att('ss:Color', '#000000');
                  border1.att('ss:LineStyle' , 'Continuous');
                  border1.att('ss:Weight' , '1');
                border1.up();
                var border2 = borders2.ele('ss:Border');
                  border2.att('ss:Position', 'Bottom');
                  border2.att('ss:Color', '#000000');
                  border2.att('ss:LineStyle' , 'Continuous');
                  border2.att('ss:Weight' , '1');
                border2.up();
            borders2.up();
              var font2 = style52.ele('ss:Font');
              font2.att('ss:Color', '#000000');
              font2.att('ss:FontName', 'Arial');
              font2.att('ss:Size', '10');
              font2.up();
        style52.up();


            
        //Styles of users details

        var style13 = styles.ele('Style');
        style13.att('ss:ID', 'SD21');
        var interior = style13.ele('Interior');
        interior.att('ss:Color', '#FFD700');
        interior.att('ss:Pattern', 'Solid');
        interior.up();
        var alignement =style13.ele('ss:Alignment');
        alignement.att('ss:Vertical', 'Bottom');
        alignement.up();
        var borders2 = style13.ele('ss:Borders');
         var border = borders2.ele('ss:Border');
           border.att('ss:Position', 'Left');
           border.att('ss:Color', '#000000');
           border.att('ss:LineStyle' , 'Continuous');
           border.att('ss:Weight' , '1');
         border.up();
          var border1 = borders2.ele('ss:Border');
            border1.att('ss:Position', 'Top');
            border1.att('ss:Color', '#000000');
            border1.att('ss:LineStyle' , 'Continuous');
            border1.att('ss:Weight' , '1');
          border1.up();
          var border2 = borders2.ele('ss:Border');
            border2.att('ss:Position', 'Right');
            border2.att('ss:Color', '#000000');
            border2.att('ss:LineStyle' , 'Continuous');
            border2.att('ss:Weight' , '1');
          border2.up();
       borders2.up();
        var font = style13.ele('ss:Font');
        font.att('ss:Color', '#000000');
        font.att('ss:FontName', 'Arial');
        font.att('ss:Size', '10');
        font.up();
        style13.up();
      
      var style23 = styles.ele('Style');
        style23.att('ss:ID', 'SD22');
          var interior = style23.ele('Interior');
              interior.att('ss:Color', '#FFD700');
              interior.att('ss:Pattern', 'Solid');
            interior.up();
          var alignement2= style23.ele('ss:Alignment');
            alignement2.att('ss:Vertical', 'Bottom');
            alignement2.up();
          var borders2 = style23.ele('ss:Borders');
              var border1 = borders2.ele('ss:Border');
                border1.att('ss:Position', 'Top');
                border1.att('ss:Color', '#000000');
                border1.att('ss:LineStyle' , 'Continuous');
                border1.att('ss:Weight' , '1');
              border1.up();
              var border2 = borders2.ele('ss:Border');
                border2.att('ss:Position', 'Right');
                border2.att('ss:Color', '#000000');
                border2.att('ss:LineStyle' , 'Continuous');
                border2.att('ss:Weight' , '1');
              border2.up();
            borders2.up();
            var font2 = style23.ele('ss:Font');
            font2.att('ss:Color', '#000000');
            font2.att('ss:FontName', 'Arial');
            font2.att('ss:Size', '10');
            font2.up();
            var numberFormat=style23.ele('ss:NumberFormat')
            numberFormat.att('ss:Format', '@')
            numberFormat.up();
        style23.up();



        var style33 = styles.ele('Style');
        style33.att('ss:ID', 'SD23');
          var interior = style33.ele('Interior');
              interior.att('ss:Color', '#FFD700');
              interior.att('ss:Pattern', 'Solid');
            interior.up();
          var alignement2= style33.ele('ss:Alignment');
            alignement2.att('ss:Vertical', 'Bottom');
            alignement2.up();
          var borders2 = style33.ele('ss:Borders');
         
              var border1 = borders2.ele('ss:Border');
                border1.att('ss:Position', 'Top');
                border1.att('ss:Color', '#000000');
                border1.att('ss:LineStyle' , 'Continuous');
                border1.att('ss:Weight' , '1');
              border1.up();
              var border2 = borders2.ele('ss:Border');
                border2.att('ss:Position', 'Right');
                border2.att('ss:Color', '#000000');
                border2.att('ss:LineStyle' , 'Continuous');
                border2.att('ss:Weight' , '1');
              border2.up();
            borders2.up();
            var font2 = style33.ele('ss:Font');
            font2.att('ss:Color', '#000000');
            font2.att('ss:FontName', 'Arial');
            font2.att('ss:Size', '10');
            font2.up();
        style33.up();

        var style43 = styles.ele('Style');
        style43.att('ss:ID', 'SD24');
          var interior = style43.ele('Interior');
              interior.att('ss:Color', '#FFD700');
              interior.att('ss:Pattern', 'Solid');
            interior.up();
          var alignement2= style43.ele('ss:Alignment');
            alignement2.att('ss:Vertical', 'Bottom');
            alignement2.up();
            var borders2 = style43.ele('ss:Borders');
         
              var border1 = borders2.ele('ss:Border');
                border1.att('ss:Position', 'Top');
                border1.att('ss:Color', '#000000');
                border1.att('ss:LineStyle' , 'Continuous');
                border1.att('ss:Weight' , '1');
              border1.up();
              var border2 = borders2.ele('ss:Border');
                border2.att('ss:Position', 'Right');
                border2.att('ss:Color', '#000000');
                border2.att('ss:LineStyle' , 'Continuous');
                border2.att('ss:Weight' , '1');
              border2.up();
            borders2.up();
            var font2 = style43.ele('ss:Font');
            font2.att('ss:Color', '#000000');
            font2.att('ss:FontName', 'Arial');
            font2.att('ss:Size', '10');
            font2.up();
        style43.up();


        var style53 = styles.ele('Style');
        style53.att('ss:ID', 'SD25');
          var interior = style53.ele('Interior');
            interior.att('ss:Color', '#FFD700');
            interior.att('ss:Pattern', 'Solid');
          interior.up();
          var alignement2= style53.ele('ss:Alignment');
            alignement2.att('ss:Vertical', 'Bottom');
            alignement2.up();
          var borders2 = style53.ele('ss:Borders');

            var border = borders2.ele('ss:Border');
              border.att('ss:Position', 'Left');
              border.att('ss:Color', '#000000');
              border.att('ss:LineStyle' , 'Continuous');
              border.att('ss:Weight' , '1');
            border.up();
              var border1 = borders2.ele('ss:Border');
                border1.att('ss:Position', 'Right');
                border1.att('ss:Color', '#000000');
                border1.att('ss:LineStyle' , 'Continuous');
                border1.att('ss:Weight' , '1');
              border1.up();
              var border2 = borders2.ele('ss:Border');
                border2.att('ss:Position', 'Bottom');
                border2.att('ss:Color', '#000000');
                border2.att('ss:LineStyle' , 'Continuous');
                border2.att('ss:Weight' , '1');
              border2.up();
          borders2.up();
            var font2 = style53.ele('ss:Font');
            font2.att('ss:Color', '#000000');
            font2.att('ss:FontName', 'Arial');
            font2.att('ss:Size', '10');
            font2.up();
      style53.up();


     styles.up();

   var worksheet = doc.ele('Worksheet');
     worksheet.att('ss:Name' , 'Feuil1');
     var names = worksheet.ele('ss:Names');
     names.up();
     var table =  worksheet.ele('ss:Table');
     table.att('ss:DefaultRowHeight', '15');   
     table.att('ss:DefaultColumnWidth', '60');
     table.att('ss:ExpandedRowCount', 30+input.members.length);
     table.att('ss:ExpandedColumnCount', 30+input.subcategories.length) ; 

     var row1 = table.ele('Row');
       row1.att('ss:Index' , '1');
        var cell1 =row1.ele('Cell');
            cell1.att('ss:StyleID' , 'SD21')
        cell1.up();
        var cell2 =row1.ele('Cell');
            cell2.att('ss:StyleID' , 'SD22')
        cell2.up();
        var cell3 =row1.ele('Cell');
            cell3.att('ss:StyleID' , 'SD23')
        cell3.up();
        var cell4 =row1.ele('Cell');
            cell4.att('ss:StyleID' , 'SD22')
        cell4.up();
        var cell5 =row1.ele('Cell');
            cell5.att('ss:StyleID' , 'SD23')
        cell5.up();
        var cell6 =row1.ele('Cell');
            cell6.att('ss:StyleID' , 'SD23')
        cell6.up();
        var cell7 =row1.ele('Cell');
            cell7.att('ss:StyleID' , 'SD23')
        cell7.up();
        var cell8 =row1.ele('Cell');
            cell8.att('ss:StyleID' , 'SD24')
        cell8.up();




        var cell1S =row1.ele('Cell');
        cell1S.att('ss:StyleID' , 'S21')
          cell1S.up();
          var cell2s =row1.ele('Cell');
              cell2s.att('ss:StyleID' , 'S22')
          cell2s.up();
          var cell3s =row1.ele('Cell');
              cell3s.att('ss:StyleID' , 'S23')
          cell3s.up();
          var cell4s =row1.ele('Cell');
              cell4s.att('ss:StyleID' , 'S22')
          cell4s.up();
          var cell5s =row1.ele('Cell');
              cell5s.att('ss:StyleID' , 'S23')
          cell5s.up();
          var cell6s =row1.ele('Cell');
              cell6s.att('ss:StyleID' , 'S22')
              var data = cell6s.ele('Data');
              data.att('ss:Type' , 'String');
              data.txt('Criters')  ;
              data.up();
          cell6s.up();
         


        for (var i=0;i<(input.subcategories.length-7);i++) {
          var subcategory =row1.ele('Cell')
             subcategory.att('ss:StyleID' , 'S23')
            subcategory.up();
           
            }
          var lastCell =row1.ele('Cell');
          lastCell.att('ss:StyleID' , 'S24')
          lastCell.up();
      


          row1.up();

       var row = table.ele('Row');
       row.att('ss:Index' , '2')
          var cell1 =row.ele('Cell');
            cell1.att('ss:StyleID' , 'SD25')
              var data1 = cell1.ele('Data');
                  data1.att('ss:Type', 'String') ;
                  data1.txt('Nom')  ;
              data1.up();
            cell1.up();

          var cell2 =row.ele('Cell');
          cell2.att('ss:StyleID' , 'SD25')
            var data2 = cell2.ele('Data');
                data2.att('ss:Type', 'String') ;
                data2.txt('Prenom')  ;
            data2.up();
          cell2.up();

           var cell3 =row.ele('Cell');
           cell3.att('ss:StyleID' , 'SD25')
            var data3 = cell3.ele('Data');
                data3.att('ss:Type', 'String') ;
                data3.txt('Age')  ;
            data3.up();
          cell3.up();

          var cell31 =row.ele('Cell');
          cell31.att('ss:StyleID' , 'SD25')
           var data31 = cell31.ele('Data');
           data31.att('ss:Type', 'String') ;
           data31.txt('Email')  ;
           data31.up();
         cell31.up();


         var cell012 =row.ele('Cell');
         cell012.att('ss:StyleID' , 'SD25')
          var data012 = cell012.ele('Data');
          data012.att('ss:Type', 'String') ;
          data012.txt('Sexe')  ;
          data012.up();
        cell31.up();

        var cell013 =row.ele('Cell');
        cell013.att('ss:StyleID' , 'SD25')
         var data013 = cell013.ele('Data');
         data013.att('ss:Type', 'String') ;
         data013.txt('Ville')  ;
         data013.up();
       cell013.up();



         var cell01 =row.ele('Cell');
         cell01.att('ss:StyleID' , 'SD25')
          var data01 = cell01.ele('Data');
              data01.att('ss:Type', 'String') ;
              data01.txt('Niveau_etude')  ;
          data01.up();
        cell01.up();

        var cell08 =row.ele('Cell');
        cell08.att('ss:StyleID' , 'SD25')
         var data08 = cell08.ele('Data');
             data08.att('ss:Type', 'String') ;
             data08.txt('Ecole')  ;
         data08.up();
       cell08.up();


         
    
   

        for (var i=0;i<input.subcategories.length;i++) {
          var subcategory =row.ele('Cell')
          subcategory.att('ss:StyleID' , 'S21')
             var data5 =  subcategory.ele('Data');
                data5.att('ss:Type', 'String'); 
                data5.txt(input.subcategories[i].name) ; 
              data5.up();
            subcategory.up();
           
            }

      row.up();

    for(var i=0 ; i<input.members.length ; i++){
                var row = table.ele('Row');
                var cell1 =row.ele('Cell');
                cell1.att('ss:StyleID' , 'Default')
                    var data1 = cell1.ele('Data');
                        data1.att('ss:Type', 'String') ;
                        data1.txt(input.members[i].firstname);
                    data1.up();
                  cell1.up();

                var cell2 =row.ele('Cell');
                cell2.att('ss:StyleID' , 'Default')
                  var data2 = cell2.ele('Data');
                      data2.att('ss:Type', 'String') ;
                      data2.txt(input.members[i].lastname);
                  data2.up();
                cell2.up();

                var cell3 =row.ele('Cell');
                cell3.att('ss:StyleID' , 'Default')
                  var data3 = cell3.ele('Data');
                      data3.att('ss:Type', 'String') ;
                      data3.txt(input.members[i].age)  ;
                  data3.up();
                cell3.up();


                var cell31 =row.ele('Cell');
                cell31.att('ss:StyleID' , 'Default')
                  var data31 = cell31.ele('Data');
                      data31.att('ss:Type', 'String') ;
                      data31.txt(input.members[i].email)  ;
                  data31.up();
                cell31.up();

                
                var cell012 =row.ele('Cell');
                cell012.att('ss:StyleID' , 'Default')
                  var data012 = cell012.ele('Data');
                      data012.att('ss:Type', 'String') ;
                      data012.txt(input.members[i].sexe)  ;
                  data012.up();
                cell012.up();
               

                var cell013 =row.ele('Cell');
                cell013.att('ss:StyleID' , 'Default')
                  var data013 = cell013.ele('Data');
                      data013.att('ss:Type', 'String') ;
                      data013.txt(input.members[i].city)  ;
                  data013.up();
                cell013.up();

                var cell01 =row.ele('Cell');
                cell01.att('ss:StyleID' , 'Default')
                  var data01 = cell01.ele('Data');
                      data01.att('ss:Type', 'String') ;
                      data01.txt(input.members[i].clazz_name)  ;
                  data01.up();
                cell01.up();

                var cell08 =row.ele('Cell');
                cell08.att('ss:StyleID' , 'Default')
                  var data08 = cell08.ele('Data');
                      data08.att('ss:Type', 'String') ;
                      data08.txt(input.members[i].school_name)  ;
                  data08.up();
                cell08.up();

              
               
                
               

               

           
              createRow(row , input.subcategories , input.members[i].result);
              row.up();
    }


       table.up();    
      worksheet.up();

     

  var data = doc.end({ pretty: true }); 
 // console.log(data);
  var txt = "<?mso-application progid='Excel.Sheet'?>" ;

var searchTerm = '>';
var indexOfFirst = data.indexOf(searchTerm);

var newData = data.substr(0, 21) + txt + data.substr(21) ;

                  //working example : convert json to xml and download xml File
                  /*  var js2xmlparser = require("js2xmlparser");
                    var dir=tmp.tmpdir;
            
                    var data = js2xmlparser.parse("details", input);*/

                    try {



                      var dir=tmp.tmpdir;
                   
                      console.log(dir);
                      fs.writeFile(dir+'/MembersInformations.xml', newData, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");   
                    });
  
  
  
  
               var xmlFile = path.join(dir ,'/MembersInformations.xml');
                   console.log(xmlFile);
                    var stream = fs.createReadStream(xmlFile);
  
                  res.writeHead(200, {'Content-disposition': 'attachment; filename=MembersInformations.xml'});
                   
                  stream.once("close", function () {
                      stream.destroy(); // makesure stream closed, not close if download aborted.
                      fs.unlink(xmlFile, function (err) {
                        if (err) {
                            console.error(err.toString());
                        } else {
                            console.warn(xmlFile + ' deleted');
                        }
                    });
                  }).pipe(res);
                /*  var path = require('path');
                  var mime = require('mime');

                  var file = dir+'/MembersInformations.xml';

                  var filename = path.basename(file);
                  var mimetype = mime.lookup(file);
                
                  res.setHeader('Content-disposition', 'attachment; filename='  + filename);
                  res.setHeader('Content-type', mimetype);
                
                  var filestream = fs.createReadStream(file);
                  filestream.pipe(res);
                 /* filestream.once("close", function () {
                    filestream.destroy(); 
                    fs.unlink(file, function (err) {
                      if (err) {
                          console.error(err.toString());
                      } else {
                          console.warn(file + ' deleted');
                      }
                  });
                }).pipe(res);*/
                 

                      
                    } catch (error) {
                      console.log(error);
                    }




 });  

}





_publics.getAllTestSubcategoriesByTestAndSubcategoryIds = (req) => {
  var tesId=req.query.testId;
  return new Promise((resolve, reject) => {  
    var sql = "select tsc.id as testSubcatId, sc.name,tsc.ordre from subcategory sc left join test_subcategory tsc on(sc.id=tsc.id_subcategory) where tsc.id_test=?";      
    con.query(sql,[tesId], function (err, result) {
    if (err) reject(err);
    return resolve(result);
    });
  }); 
}



_publics.updateSubcategoriesOrder = (ordre, req) => {
  return new Promise((resolve, reject) => {  
    var sql = "update test_subcategory  set ordre=? where id=?"; 
    var msg="";     
    con.query(sql,[ordre, req.query.id], function (err, result) {
    if (err){
      msg="failed";
    }else{
      msg="success";
    }
    return resolve(msg);
    });
  }); 
}





_publics.getAllCriterionsBySubcategoryId = (req) => { 
  var subCategoryId=req.query.id;
  var testId=req.query.id_test;
  var memberId=req.query.id_member;
  return new Promise((resolve, reject) => {  
           
              /* var sql="select distinct c1.* , "+
               "(select coalesce(FLOOR(sum(ma.etallonage_result)/count(ma.id)),0)  from manuel_answer ma  left join subcategory_criterion sc on(ma.id_subcategory=sc.id_subcategory) "+
               "left join criterion c2 on(c2.id=sc.id_criterion) where c2.id_subcategory=? and ma.id_test=? and id_member=? and c1.id=c2.id) as score "+
               "from manuel_answer ma  left join subcategory_criterion sc on(ma.id_subcategory=sc.id_subcategory) "+
               "left join criterion c1 on(c1.id=sc.id_criterion) where c1.id_subcategory=? and ma.id_test=? and id_member=?"*/
               var sql="select distinct c.* , c.result as score   from manuel_answer ma  left join criterion c on(ma.id_subcategory=c.id_subcategory) "+
               "where c.id_subcategory=? and ma.id_test=? and id_member=?;"
               con.query(sql,[subCategoryId,testId,memberId], function (err, result) {
               if (err) reject(err);
               return resolve(result);
               });
   });    
};


_publics.createCriterion = (criterion) => { 
  var name=criterion.name;
  var categoryId=criterion.id_category[0].id;
  var ordre=criterion.ordre;
  return new Promise((resolve, reject) => { 
    var msg="";
    var sql = "insert into criterion set ? ";
    const newCriterion = { name: name,id_category:categoryId,ordre:ordre};         
    con.query(sql,newCriterion, function (err, result) {
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

/*_publics.createSubcategoryCriterions = (criterionId, subcategories) => { 
  let promises = [];
  for (var i=0;i<subcategories.length;i++) {
    promises.push( new Promise((resolve, reject) => {  
            var response=createSubcategoryCriterion(criterionId, subcategories[i].id);
            return resolve(response);
          }));
   }
   return Promise.all(promises)   
};*/

/*function createSubcategoryCriterion(criterionId,subcategoryId){
  return new Promise((resolve, reject) => { 
    var msg="";
    var sql = "insert into subcategory_criterion set ? ";
    const object = { id_criterion: criterionId,id_subcategory:subcategoryId};         
    con.query(sql,object, function (err, result) {
            if (err){
              msg="failure";
              reject(err);
            }else{
              msg="success";
            }
           return resolve(msg);
       });
}); 
}*/


/*_publics.deleteAllSubcategoryCriterions = (criterionId) => { 
  return new Promise((resolve, reject) => { 
        var sql = "DELETE FROM subcategory_criterion WHERE id_criterion=?"; 
        var msg="";
        con.query(sql,[criterionId], function (err, result) {
          if (err){
            msg="failure";
            reject(err);
          }else{
            msg="success";
          }
        return resolve(msg);
        });
  });
};*/




_publics.getAllCriterions = (req) => { 
  
  return new Promise((resolve, reject) => {  
           var sql = "select c.*, cat.name as subcategory FROM criterion c left join category cat on(c.id_category=cat.id) order by id desc "; 
         
               con.query(sql, function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};

_publics.getCriterionById = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM criterion where id=?"; 
         
               con.query(sql,[id], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result[0]));
               });
   });    
};

_publics.getAllCriterionsByCategoryId = (req) => { 
  var idCategory=req.query.idCategory;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM criterion  where id_category=? "; 
         
               con.query(sql,[idCategory], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};

_publics.updateCriterion = (req,criterion) => { 
 var name=criterion.name;
 var order=criterion.ordre;
 var id_category=criterion.id_category[0].id;
 var id=req.query.id;
   return new Promise((resolve, reject) => {  
            var msg="";
            var sql = "update  criterion set name=?,ordre=?,id_category=? where id=?";
            con.query(sql,[name,order,id_category,id], function (err, result) {
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


_publics.deleteCriterion = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var msg="";
           var sql = "delete from criterion where id=?";
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


/*_publics.deleteSubcategorycriterionByCriterionId = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var msg="";
           var sql = "delete from subcategory_criterion where id_criterion=?";
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
}; */


/*_publics.getAllCriterionsByTestId = (req) => { 
  var idtest=req.query.id_test;
  return new Promise((resolve, reject) => {  
           var sql = "select  distinct c.name as subcategory,c.id , ts.ordre, ts.id as testSubcategoryId  FROM criterion c left join test_subcategory ts on (c.id_subcategory=ts.id_subcategory) where ts.id_test=?"; 
         
               con.query(sql,[idtest], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};*/


_publics.getAllCategoriesByCriterionId = (req) => {
  return new Promise((resolve, reject) => {   
    var sql = "select cat.* from category cat left join criterion c on(cat.id=c.id_category) where c.id=?";        
    con.query(sql,[req.query.criterionId], function (err, result) {
    if (err) reject(err);
    return resolve(result);
    });
 });  

}

_publics.getJsonFromFile = () => {
      var source=__dirname+"/subCatDetails.json";
      return new Promise((resolve, reject) => {   
        let jsonData = require(source);
        return resolve(jsonData);
     }); 
}

_publics.getSubcategoryDetails = (req,json) => {
  var subcategoryName=req.query.subcategoryName;
  return new Promise((resolve, reject) => { 
    for (var i = 0; i < json.length; i++) {  
        if(json[i].name===subcategoryName){
          return resolve(json[i].definition);
        }
      }
      return resolve("");
 }); 

}



_publics.getAllCriterionsByTestId = (req) => {
  var testId=req.query.testId;
  return new Promise((resolve, reject) => {   
    //var sql = "select c.* from criterion c left join test_subcategory ts on(ts.id_subcategory=c.id_subcategory1) where ts.id_test=?";      
    var sql = "select c.* from criterion c order by id desc";   
    con.query(sql,[testId], function (err, result) {
    if (err) reject(err);
    return resolve(result);
    });
 }); 

}





module.exports = _publics;