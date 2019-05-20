'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var con=config.con;

const request = require('request');
var url=`http://localhost:3002`;

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
             var sql = "select name as subcategory,s.id FROM subcategory s left join test_subcategory ts on (s.id=ts.id_subcategory) where ts.id_test=?"; 
           
                 con.query(sql,[idtest], function (err, result) {
                 if (err) reject(err);
                 return resolve(JSON.stringify(result));
                 });
     });    
  };
_publics.getAllSubcategoriesByCategory = (req) => { 
  var idCategory=req.query.idCategory;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM subcategory where id_category=?"; 
         
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
            if (err) return next(err)
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



_publics.createNewQuestion = (question ) => { 
  var name=question.name;
  var wording=question.wording;
  var value=question.value;  
  var id_test_subcategory=question.id_test_subcategory;
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
        console.log("statusCode="+r.statusCode);
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
                var sql = "select * FROM subcategory sc left join test_subcategory ts on (sc.id=ts.id_subcategory) where ts.id=1"; 
              
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
_publics.getAllActiveTests = (req) => { 
    var date=new Date;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM test where expiration_date>=?";        
               con.query(sql,[date], function (err, result) {
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
      return new Promise((resolve, reject) => { 
      var msg="";
      var sql = "insert into test set ? ";
      const newTest = { name: name,test_subcategories_number:test_subcategories_number,password:password,activation_date:activation_date,expiration_date:expiration_date};         
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
      var id=req.query.id;
    return new Promise((resolve, reject) => {  
             var msg="";
             var sql = "update  test set name=?,test_subcategories_number=?,password=?,activation_date=?,expiration_date=? where id=?";
             con.query(sql,[name,test_subcategories_number,password,activation_date,expiration_date,id], function (err, result) {
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


_publics.duplicateTestSubCategories = (testSubcategories,questions,testId ) => { 
  //console.log("questions==>"+JSON.stringify(questions));
  //console.log("testSubcategories==>"+JSON.stringify(testSubcategories));
  let promises = [];
  for (var i=0; i<testSubcategories.length;i++) {
    promises.push(new Promise((resolve, reject) => {
      var msg="";
      var response={};
      var sql = "INSERT INTO test_subcategory SET ?";
      con.query(sql,{id_category:testSubcategories[i].id_category,id_subcategory:testSubcategories[i].id_subcategory,id_test:testId,questions_number:testSubcategories[i].questions_number,wording:testSubcategories[i].wording}, function (err, result) {
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
    ));
  }
  return Promise.all(promises)      
}; 






_publics.duplicateQuestion = (questions,testSubcategoriesIds ) => { 
  console.log(JSON.stringify(questions));
  let promises = [];
  for (var i=0;i<questions.length;i++) {
    promises.push(new Promise((resolve, reject) => {
      var msg="";
      var response={};
      var sql = "INSERT INTO test_subcategory SET ?";
      con.query(sql,{name:questions[i].name,wording:questions[i].wording,value:questions[i].value,testSubCategId}, function (err, result) {
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
    ));
  }
  return Promise.all(promises)      
}; 



_publics.duplicateAnswer = (answers ) => { 

  let promises = [];
  for (var i=0;i<answers.length;i++) {
    promises.push(new Promise((resolve, reject) => {
      var msg="";
      var sql = "INSERT INTO answer (id_question, value, name, ordre) select id_question, value, name, ordre from answer where id=?";
      con.query(sql,answers[i].id, function (err, result) {
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
      promises.push( new Promise((resolve, reject) => request.get({
          url :url+`/admin/getAnswersPerQuestion?id=${questions[i].id}`,
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

_publics.getAllSubcategoriesByCategories = (categories) => { 
  let promises = [];
  for (var i=0;i<JSON.parse(categories).length;i++) {
    promises.push( new Promise((resolve, reject) => request.get({
      url :url+`/calcul/getSubcategoriesByCategory?id=${JSON.parse(categories)[i].category_id}`,
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


module.exports = _publics;