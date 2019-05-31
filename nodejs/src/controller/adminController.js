'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var con=config.con;

const path = require('path');
var fs = require("fs"); // node filesystem
var tmp = require('tmp');


const request = require('request');
var url=`http://localhost:`+config.port;
const perf = require('execution-time')();

_publics.getAllCategories = (req) => { 
  
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM category"; 
         
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
             var sql = "delete from   category where id=?";
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



 // clazz controller
_publics.getAllClasses = (req) => { 
  
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM clazz"; 
         
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
           var sql = "select * FROM school"; 
         
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
             var sql = "select  distinct name as subcategory,s.id FROM subcategory s left join test_subcategory ts on (s.id=ts.id_subcategory) where ts.id_test=?"; 
           
                 con.query(sql,[idtest], function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
     });    
  };
_publics.getAllSubcategoriesByCategory = (req) => { 
  var idCategory=req.query.idCategory;
  var idMember=req.query.id_member;
  console.log("idMember "+idMember);
  return new Promise((resolve, reject) => {  
           var sql = "select sc.*, ma.id as manualAnswerId FROM subcategory sc left join manuel_answer ma on(sc.id=ma.id_subcategory) where sc.id_category=? and ma.id_member=?"; 
         
               con.query(sql,[idCategory,idMember], function (err, result) {
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
  return new Promise((resolve, reject) => {  
           var response={};
           var questionId;
           var sql = "INSERT INTO question SET ? ";
           const newQuestion = { name: name,wording:wording,value:value,id_test_subcategory:id_test_subcategory};
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
  var name=question.name;
  var wording=question.wording;
  var value=question.value;
  var question_id=req.query.id;
  var id_test_subcategory=question.id_test_subcategory;
  return new Promise((resolve, reject) => { 
           var msg="";
           var sql = "UPDATE question SET name=?, wording=?,value=?,id_test_subcategory=?  WHERE id = ?"; 
           con.query(sql,[name,wording,value,id_test_subcategory,question_id], function (err, result) {
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

_publics.getAllQuestion = (req) => { 
  
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM question "; 
         
               con.query(sql, function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
               });
   });    
};

_publics.getAllQuestionsByIdTestSubcategory = (req) => { 
 var idTestSubcategory=req.query.idTestSubcategory;
    return new Promise((resolve, reject) => {  
             var sql = "select q.* FROM question q left join test_subcategory ts on (ts.id=q.id_test_subcategory) where ts.id=?"; 
           
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
           var sql = "UPDATE answer SET id_question=?, name=?,value=?,ordre=?  WHERE id = ?"; 
           con.query(sql,[id_question,name,value,ordre,answer_id], function (err, result) {
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
            console.log('Error:' + reject(e));
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
           var sql = "select * FROM test";          
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
                reject(err);
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


_publics.RemoveAffectationCategoriesToTest = (testId, categoriesList) => {
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
// duplicate test
_publics.getFirstTest = () => { 
  return new Promise((resolve, reject) => { 
  var sql = "select * from test order by id asc";
  con.query(sql, function (err, result) {
          if (err){
            reject(err);
          }else{
            return resolve(result);
          }
          
     });
});      
}; 

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
  var sql = "select * from test_subcategory where id_test=?";
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

_publics.duplicateTest = (test) => { 
  
  var name=test.name;
  var test_subcategories_number=test.test_subcategories_number;
  var password =test.password;
  var activation_date=test.activation_date;
  var expiration_date=test.expiration_date;
  return new Promise((resolve, reject) => { 
  var response={};
  var sql = "insert into test set ? ";
  const newTest = { name: name,test_subcategories_number:test_subcategories_number,password:password,activation_date:activation_date,expiration_date:expiration_date};         
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




_publics.duplicateQuestionAndAnswers = (questions,testSubCategId) => { 
  let promises = [];
  for (var i=0;i<questions.length;i++) {
    promises.push( 
       new Promise((resolve, reject) => request.post({
      url :url+`/admin/createQuestionAndAnswers?testSubCategId=${testSubCategId}`,
      method: 'POST',
      gzip: true,
      json: true,
      rejectUnauthorized: false,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(questions)),
        //'Content-Length': Buffer.byteLength("{\"questions\":[{\"question\":{\"id\":1,\"name\":\"question1\",\"wording\":\"frensh\",\"value\":1,\"id_test_subcategory\":1},\"answers\":[{\"id\":1,\"id_question\":1,\"value\":\"1\",\"name\":\"Dymanique\",\"ordre\":1},{\"id\":2,\"id_question\":1,\"value\":\"1\",\"name\":\"Energique\",\"ordre\":2}]},"+
       //"{\"questions\":[{\"question\":{\"id\":1,\"name\":\"question1\",\"wording\":\"frensh\",\"value\":1,\"id_test_subcategory\":1},\"answers\":[{\"id\":1,\"id_question\":1,\"value\":\"1\",\"name\":\"Dymanique\",\"ordre\":1},{\"id\":2,\"id_question\":1,\"value\":\"1\",\"name\":\"Energique\",\"ordre\":2}]}]}")
    }
    }, (e, r, b) => {
      if (!e && r.statusCode == 200) {
        console.log("wawwwwwwwwwwww");
        return resolve(JSON.parse(b));
      } else {
        console.log("looooooooooooool"+r.statusCode+" eroor= "+e);
        reject(e);
      }
    }))
    )
    ;
  }
  return Promise.all(promises)      

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
    var sql = "select t.name, tm.date_test, m.firstname, m.lastname from test t left join test_member tm on(t.id=tm.id_test) left join member m on(m.id=tm.id_member) where 5=5";        
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
  console.log("sql= "+sql);
  return sql;
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
  

     function createSubcategories(subcategories ){
      let promises = [];
      var decode = require('unescape');
     
      //var subcategories = ['authenticité' , 'Diplomatie' , 'Sociabilité' , 'Tolérance'];
      for (var i=0;i<subcategories.length;i++) {
        promises.push( new Promise((resolve, reject) => { 
          
        
            subc = subc+ "<Cell> <Data>" +subcategories[i] +"</Data> </Cell>" ;
           
              
            
            
          }));
      }
      


      return Promise.all(promises);   
    
    }
    
  

_publics.generateXMLFile = (input,req , res  ) => {
  return new Promise((resolve, reject) => {   
    
    var subcategories = ['authenticité' , 'Diplomatie' , 'Sociabilité' , 'Tolérance'];
    var categoryNum = 8 ; 
    var memberNum = 3 ;
    var builder = require('xmlbuilder');
    
   
    var subc = "" ;

    var decode = require('unescape');

    for (var i=0;i<subcategories.length;i++) {
    subc = subc+ "<Cell> <Data>" +subcategories[i] +"</Data> </Cell>" ;
    }



    var doc = builder.create('Workbook');
    doc.att('xmlns:o', 'urn:schemas-microsoft-com:office:office');
    doc.att('xmlns:x', 'urn:schemas-microsoft-com:office:excel');
    doc.att('xmlns:ss', 'urn:schemas-microsoft-com:office:spreadsheet');
    doc.att('xmlns', 'urn:schemas-microsoft-com:office:spreadsheet');
    doc.att('xmlns:x2', 'urn:schemas-microsoft-com:office:excel2');
    var styles =doc.ele('Styles');
     var style1 = styles.ele('Style');
        style1.att('ss:ID', 'Default');
        style1.att('ss:Name', 'Normal');
        var alignement =style1.ele('ss:Alignment');
        alignement.att('ss:Vertical', 'Bottom');
        alignement.up();
        var font = style1.ele('ss:Font');
        font.att('ss:Color', '#000000');
        font.att('ss:FontName', 'Calibri');
        font.att('ss:Size', '11');
        font.up();
        style1.up();
      
      var style2 = styles.ele('Style');
        style2.att('ss:ID', 'S21');
          var alignement2= style2.ele('ss:Alignment');
            alignement2.att('ss:Vertical', 'Bottom');
            alignement2.up();
            var font2 = style2.ele('ss:Font');
            font2.att('ss:Color', '#000000');
            font2.att('ss:FontName', 'Calibri');
            font2.att('ss:Size', '11');
            font2.up();
            var numberFormat=style2.ele('ss:NumberFormat')
            numberFormat.att('ss:Format', '@')
            numberFormat.up();
            style2.up();
     styles.up();

   var worksheet = doc.ele('Worksheet');
     worksheet.att('ss:Name' , 'Feuil1');
     var table =  worksheet.ele('ss:Table');
     table.att('ss:DefaultRowHeight', '15');   
     table.att('ss:DefaultColumnWidth', '60');
     table.att('ss:ExpandedRowCount', memberNum);
     table.att('ss:ExpandedColumnCount', 4+categoryNum) ; 
       var row = table.ele('Row');
          var cell1 =row.ele('Cell');
              var data1 = cell1.ele('Data');
                  data1.att('ss:Type', 'String') ;
                  data1.txt('nom')  ;
              data1.up();
            cell1.up();

          var cell2 =row.ele('Cell');
            var data2 = cell2.ele('Data');
                data2.att('ss:Type', 'String') ;
                data2.txt('prenom')  ;
            data2.up();
          cell2.up();

           var cell3 =row.ele('Cell');
            var data3 = cell3.ele('Data');
                data3.att('ss:Type', 'String') ;
                data3.txt('age')  ;
            data3.up();
          cell3.up();

          var cell4 =row.ele('Cell');
            var data4 = cell4.ele('Data');
                data4.att('ss:Type', 'String') ;
                data4.txt('niveau Etude')  ;
            data4.up();
          cell4.up();

          for (var i=0;i<subcategories.length;i++) {
          var subcategory =row.ele('Cell')
             var data5 =  subcategory.ele('Data');
                data5.att('ss:Type', 'String'); 
                data5.txt(subcategories[i]) ; 
              data5.up();
            subcategory.up();
           
            }

         row.up();






       table.up();    
      worksheet.up();

     

  var xml = doc.end({ pretty: true }); 
  console.log(xml);


  

                  //working example : convert json to xml and download xml File
                  /*  var js2xmlparser = require("js2xmlparser");
                    var dir=tmp.tmpdir;
            
                    var data = js2xmlparser.parse("details", input);

                    
                    fs.writeFile(dir+'\\Member_Information.xml', data, function(err) {
                      if(err) {
                          return console.log(err);
                      }
                      
                      console.log(data);
                  });

                  var xmlFile = path.join(dir, 'Member_Information.xml');
                  var stream = fs.createReadStream(xmlFile);

                  res.writeHead(200, {'Content-disposition': 'attachment; filename=Member_Information.xml'}); 
                  stream.pipe(res);
                  stream.once("end", function () {
                    stream.destroy(); // makesure stream closed, not close if download aborted.
                    fs.unlink("Member_Information.xml", function (err) {
                      if (err) {
                          console.error(err.toString());
                      } else {
                          console.warn("Member_Information.xml" + ' deleted');
                      }
                    });
                  });*/
     


 });  

}





module.exports = _publics;