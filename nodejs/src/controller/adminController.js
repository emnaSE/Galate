'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var con=config.con;

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
               return resolve(JSON.stringify(result));
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
               return resolve(JSON.stringify(result));
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
               return resolve(JSON.stringify(result));
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
               return resolve(JSON.stringify(result));
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
             var sql = "update  subcategory set name=?,id_category=?,down_description=?,up_description where id=?";
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
  return new Promise((resolve, reject) => {  
           var msg="";
           var sql = "INSERT INTO question SET ? ";
           const newQuestion = { name: name,wording:wording,value:value};
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

_publics.updateQuestion=(req,question) => { 
  var question=JSON.parse(question);
  var name=question.name;
  var wording=question.wording;
  var value=question.value;
  var question_id=req.query.id;
  return new Promise((resolve, reject) => { 
           var msg="";
           var sql = "UPDATE question SET name=?, wording=?,value=?  WHERE id = ?"; 
           con.query(sql,[name,wording,value,question_id], function (err, result) {
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

_publics.getQuestionById = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM question where id=?"; 
               con.query(sql,[id], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
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

_publics.getAnswerById = (req) => { 
  var id=req.query.id;
  return new Promise((resolve, reject) => {  
           var sql = "select * FROM answer where id=?";          
               con.query(sql,[id], function (err, result) {
               if (err) reject(err);
               return resolve(JSON.stringify(result));
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
               return resolve(JSON.stringify(result));
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

_publics.duplicateTest = (test) => { 
  var test=JSON.parse(test)
  var id=test.id;
  
  return new Promise((resolve, reject) => { 
  var msg="";
  var sql = "INSERT INTO test ( test_subcategories_number, name,password,activation_date,expiration_date) SELECT test_subcategories_number, name, password, activation_date,expiration_date FROM test WHERE  id=? ";
  //const newTest = { name: name,test_subcategories_number:test_subcategories_number,password:password,activation_date:activation_date,expiration_date:expiration_date};         
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


module.exports = _publics;