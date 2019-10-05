'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var con = config.con;
var url = `http://localhost:3000`;
//member 
_publics.register = (member) => {
  var member = JSON.parse(member);
  var firstname = member.firstname;
  var lastname = member.lastname;
  var email = member.email;
  var age = member.age;
  var pseudo = member.pseudo;
  var password = member.password;
  var civility = member.civility;
  var id_school = member.id_school;
  var id_clazz = member.id_clazz;
  var sexe = member.sexe;
  var city = member.city;
  var study_level = member.study_level;

  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "INSERT INTO member SET ? ";
    const newMember = { firstname: firstname, lastname: lastname, email: email, age: age, pseudo: pseudo, password: password, civility: civility, id_school: id_school, id_clazz: id_clazz, sexe:sexe, city:city, study_level:study_level};
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, newMember, function (err, result) {
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success",memberId:result.insertId};
      }
      return resolve(message);
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
_publics.updateMember = (req, member) => {
  var member = JSON.parse(member);
  var firstname = member.firstname;
  var lastname = member.lastname;
  var email = member.email;
  var age = member.age;
  var pseudo = member.pseudo;
  var password = member.password;
  var civility = member.civility;
  var id_school = member.id_school;
  var id_clazz = member.id_clazz;


  var id = req.query.id;
  return new Promise((resolve, reject) => {
    var msg = "";
    var sql = "UPDATE member SET firstname=?, lastname=?, email=?, age=?, pseudo=?, password=?,civility=?,id_school=?,id_clazz=?  WHERE id = ?";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [firstname, lastname, email, age, pseudo, password, civility, id_school, id_clazz, id], function (err, result) {
      if (err) {
        msg = "failure";
        reject(err);
      } else {
        msg = "success";
      }
      return resolve(msg);
    });
  });
};

_publics.deleteMember = (req) => {
  var id = req.query.id;
  return new Promise((resolve, reject) => {
    var sql = "DELETE FROM member WHERE id = ?";
    var msg = "";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [id], function (err, result) {
      if (err) {
        msg = "failure";
        reject(err);
      } else {
        msg = "success";
      }
      return resolve(msg);
    });
  });
};

_publics.getAllMembers = (req) => {

  return new Promise((resolve, reject) => {
    var sql = "select * FROM member";

    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};
//login
_publics.login = (member) => {

  var memberDetails = {};
  var member0 = JSON.parse(member);
  var pseudo = member0.pseudo;
  var password = member0.password;

  return new Promise((resolve, reject) => {

    var sql = "select * FROM member where pseudo=? and password=? ";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [pseudo, password], function (err, members) {
      var members = JSON.stringify(members);
      members = JSON.parse(members);

      if (err) {
        memberDetails = {
          status: 500
        };
      } else if (members[0] === undefined || (members[0].password !== password)) {
        memberDetails = {
          status: 403
        };
      } else {
        memberDetails = {
          member: members[0],
          status: 200,
        };
      }
      return resolve(JSON.stringify(memberDetails));
    });
  });
};

_publics.getMemberById = (req) => {
  var idMember = req.query.id;
  return new Promise((resolve, reject) => {
    var sql = "select * FROM member where id=?";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [idMember], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};

_publics.getMemberDetailsById = (req) => {
  var idMember = req.query.id;
  return new Promise((resolve, reject) => {
    var sql = "select m.firstname , m.lastname , m.age , m.email , m.city , m.sexe , m.civility , c.name as clazz_name , s.name as school_name FROM member m left join clazz c on (c.id = m.id_clazz) left join school s on (s.id = m.id_school) where m.id=?";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [idMember], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};
//choice member
_publics.createChoiceMember = (choice_member) => {
  var choice_member = JSON.parse(choice_member);
  var id_question = choice_member.id_question;
  var id_answer = choice_member.id_answer;
  var id_test_member = choice_member.id_test_member;


  return new Promise((resolve, reject) => {
    var msg = "";
    var sql = "INSERT INTO choice_member SET ? ";
    const newChoiceMember = { id_question: id_question, id_answer: id_answer, id_test_member: id_test_member };
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, newChoiceMember, function (err, result) {
      if (err) {
        msg = "failure";
        reject(err);
      } else {
        msg = "success";
      }
      return resolve(msg);
    });
  });


};


_publics.createMemberChoices = (response) => {
  let promises = [];
  var response = JSON.parse(response);
  var choices = response.choices;
  var msg = "";
  for (var i in choices) {
    promises.push(new Promise((resolve, reject) => {

      response = createNewMemberChoices(choices, i, msg);
      return resolve(response);
    }));
  }
  return Promise.all(promises)
}

_publics.updateChoiceMember = (req, choiceMember) => {
  var choiceMember = JSON.parse(choiceMember);
  var id_question = choiceMember.id_question;
  var id_answer = choiceMember.id_answer;
  var id_test_member = choiceMember.id_test_member;



  var id = req.query.id;
  return new Promise((resolve, reject) => {
    var msg = "";
    var sql = "UPDATE choice_member SET id_question=?, id_answer=?, id_test_member=?  WHERE id = ?";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [id_question, id_answer, id_test_member, id], function (err, result) {
      if (err) {
        msg = "failure";
        reject(err);
      } else {
        msg = "success";
      }
      return resolve(msg);
    });
  });
};

_publics.deleteChoiceMember = (req) => {
  var id = req.query.id;
  return new Promise((resolve, reject) => {
    var sql = "DELETE FROM choice_member WHERE id = ?";
    var msg = "";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [id], function (err, result) {
      if (err) {
        msg = "failure";
        reject(err);
      } else {
        msg = "success";
      }
      return resolve(msg);
    });
  });
};

_publics.getAllChoiceMembers = (req) => {

  return new Promise((resolve, reject) => {
    var sql = "select * FROM choice_member";

    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};

_publics.getMemberByClass = (req) => {
  var idClazz = req.query.idClazz;
  return new Promise((resolve, reject) => {
    var sql = "select * FROM member where id_clazz=? ";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [idClazz], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};

_publics.getTestMembersByClassSchool = (req) => {
  var id_clazz = req.query.id_clazz;
  var id_school = req.query.id_school;
  return new Promise((resolve, reject) => {
    var sql = "select * FROM member where id_school=? and  id_clazz=? ";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [id_school, id_clazz], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });

};
//test member 
_publics.createTestMember = (testId,memberId) => {

  var date=new Date;
  return new Promise((resolve, reject) => {
    var msg = "";
    var sql = "INSERT INTO test_member SET ? ";
    const newtestMember = { id_test: testId, id_member: memberId, date_test:date };
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, newtestMember, function (err, result) {
      if (err) {
        msg = "failure";
        reject(err);
      } else {
        msg = "success";
      }
      return resolve(msg);
    });
  });


};

_publics.updateTestMember = (req, testMember) => {
  var testMember = JSON.parse(testMember);
  var id_test = testMember.id_test;
  var id_member = testMember.id_member;



  var idTestMember = req.query.id;
  return new Promise((resolve, reject) => {
    var msg = "";
    var sql = "UPDATE test_member SET id_test=?, id_member=?  WHERE id = ?";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [id_test, id_member, idTestMember], function (err, result) {
      if (err) {
        msg = "failure";
        reject(err);
      } else {
        msg = "success";
      }
      return resolve(msg);
    });
  });
};

_publics.deleteTestMember = (req) => {
  var idTestMember = req.query.id;
  return new Promise((resolve, reject) => {
    var sql = "DELETE FROM test_member WHERE id = ?";
    var msg = "";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [idTestMember], function (err, result) {
      if (err) {
        msg = "failure";
        reject(err);
      } else {
        msg = "success";
      }
      return resolve(msg);
    });
  });
};

_publics.getAllMemberTest = (req) => {
  var idMember = req.query.idMember;
  return new Promise((resolve, reject) => {
    var sql = "select * FROM test_member where id_member=?";

    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [idMember], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};

_publics.getTestMemberByMemberIdAndTestId = (req) => {
  var idMember = req.query.idMember;
  var idTest = req.query.idTest;
  return new Promise((resolve, reject) => {
    var sql = "select * FROM test_member where id_member=? and id_test=?";

    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [idMember,idTest], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result[0]));
    });
  });
};


_publics.getTestMemberByTestId = (req) => {
  var req = JSON.parse(req);
  var id_member = req.id_member;
  var id_test = req.id_test;

  return new Promise((resolve, reject) => {
    var sql = "select id as id FROM test_member where id_member=? and id_test=?";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [id_member, id_test], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });

};



_publics.getAllTestMembers = (req) => {

  return new Promise((resolve, reject) => {
    var sql = "select * FROM test_member";

    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};

_publics.updateManuelAnswer = (req, manuelAnswer) => {
  var manuelAnswer = JSON.parse(manuelAnswer);
  var id_test = manuelAnswer.id_test;
  var id_member = manuelAnswer.id_member;
  var id_subcategory = manuelAnswer.id_subcategory;
  var id = manuelAnswer.id;
  var response = req.query.response;



  var id = req.query.id;
  return new Promise((resolve, reject) => {
    var msg = "";
    var sql = "UPDATE manuel_answer set response=?  WHERE id = ?";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [response, id], function (err, result) {
      if (err) {
        msg = "failure";
        reject(err);
      } else {
        msg = "success";
      }
      return resolve(msg);
    });
  });
};

//test details
_publics.getTestDetails = (req) => {
  var id_test = req.query.id_test;



  return new Promise((resolve, reject) => {
    var sql = "select q.id_test_subcategory as testSubcategory, a.id as answerId, a.name as answer, a.ordre as ordre,s.name as subcategory_name,s.id_category as idCategory,q.id as questionId from answer a "
      + "left join question q on (a.id_question=q.id) left join test_subcategory ts on (ts.id=q.id_test_subcategory) "
      + "left join subcategory s on(ts.id_subcategory=s.id) where id_test=? ";

    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [id_test], function (err, result) {
      if (err) reject(err);
      //{"answerId":1,"answer":"Dymanique","ordre":1,"subcategory_name":"Authenticité","idCategory":1}
/*
      var map = {};
      var questionMap = {};
      var testMap = {};
      var subMap = {};
    
      for (var i = 0; i < result.length; i++) {
        var obj = result[i];

        if (questionMap[obj.questionId] === undefined) {
          questionMap[obj.questionId] ={"answers":[{"answer":{ "answerId": obj.answerId, "answer": obj.answer, "ordre": obj.ordre }}]};
        }
        else {

          questionMap[obj.questionId].answers.push({"answer":{ "answerId": obj.answerId, "answer": obj.answer, "ordre": obj.ordre }});

        }
        map[obj.subcategory_name]={"questions":[]};
        for (var j in questionMap) {
          map[obj.subcategory_name].questions={"question":j};
          j++;
        }

        for(var q in map){
         
          testMap["subcategories"]=[map];
        }
*/
 //     }

      return resolve(JSON.stringify(result));
    });
  });

};

// vérifier password 
_publics.verifPasswordTest = (test) => {

  var testDetails = {};
  var test = JSON.parse(test);
  var password = test.password;

  return new Promise((resolve, reject) => {

    var sql = "select * FROM test where password=? ";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [password], function (err, tests) {
      var tests = JSON.stringify(tests);
      tests = JSON.parse(tests);

      if (err) {
        testDetails = {
          status: 500
        };
      } else if (tests[0] === undefined || (tests[0].password !== password)) {
        testDetails = {
          status: 403
        };

      } else {
        testDetails = {
          tests: tests[0],
          status: 200,
        };
      }
      return resolve(JSON.stringify(testDetails));
    });
  });
};


module.exports = _publics;

function createNewMemberChoices(choices, i, msg) {
    var sql = "INSERT INTO choice_member SET id_question=?,id_answer=? ,id_test_member=?   ";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [choices[i].id_question, choices[i].id_answer, choices[i].id_test_member], function (err, result) {
      if (err) {
        msg = "failure";
      }
      else {
        msg = "success";
      }
      return msg;
    });
}

/*function createNewMemberChoices(choices, i, msg) {
  var sql = "select count(*) as size from choice_member where id_question=? and id_test_member=?  ";
  pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [choices[i].id_question, choices[i].id_test_member], function (err, result) {

    if (err) {
      msg = "failure";
    }
    else {
      var size = JSON.parse(JSON.stringify(result[0].size));

      if (size === 0) {
        var sql = "INSERT INTO choice_member SET id_question=?,id_answer=? ,id_test_member=?   ";
        pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [choices[i].id_question, choices[i].id_answer, choices[i].id_test_member], function (err, result) {
          if (err) {
            msg = "failure";
          }
          else {
            msg = "record added";
          }
          return msg;
        });
      } else {
        var sql = "update choice_member SET id_answer=? where id_question=? and id_test_member=?   ";
        pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [choices[i].id_answer, choices[i].id_question, choices[i].id_test_member], function (err, result) {
          if (err) {
            msg = "failure";
          }
          else {
            msg = "record updated";
          }
          return msg;
        });
      }
    }
  });
  return msg;
}*/

//get test En Cours 
_publics.getTestEnCours = (req) => {
  var date = new Date;
  var id_member = req.query.id_member;

  return new Promise((resolve, reject) => {
    var sql = " select * from test t left join test_clazz tc on (t.id=tc.id_test) left join member m on (tc.id_clazz=m.id_clazz) where m.id=? and activation_date < ? and expiration_date >?";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [id_member, date, date], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};


_publics.loginForTest = (testId, password) => {
  var response = {};
  var pwd = JSON.parse(password);
  var password = pwd.password;

  return new Promise((resolve, reject) => {
    var sql = "select * FROM test where id=? ";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [testId], function (err, tests) {
      var tests = JSON.stringify(tests);
      tests = JSON.parse(tests);

      if (err) {
        response = {
          status: 500
        };
      } else if (tests[0] === undefined || (tests[0].password !== password)) {
        response = {
          status: 403
        };
      } else {
        response = {
          member: tests[0],
          status: 200,
        };
      }
      return resolve(JSON.stringify(response));
    });
  });
};



_publics.deleteMemberChoicesByIdTestMember = (testMemberId) => {
  return new Promise((resolve, reject) => {
    var sql = " delete from choice_member where id_test_member=?";
    var msg="";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [testMemberId], function (err, result) {
      if (err) {
        msg = "failure";
      }
      else {
        msg = "success";
      }
      return resolve(msg);
    });
  });
};


_publics.deleteManuelAnswersByTestMember = (req) => {

  var id_test=req.query.id_test;
  var id_member=req.query.id_member;
  return new Promise((resolve, reject) => {
    var sql = " delete from manuel_answer where id_member=? and id_test=?";
    var msg="";
    pool.getConnection(function(err,connection){ 
if (err) {  
reject(err);
 }
connection.query
(sql, [id_member,id_test], function (err, result) {
      if (err) {
        msg = "failure";
      }
      else {
        msg = "success";
      }
      return resolve(msg);
    });
  });
};


module.exports = _publics;

