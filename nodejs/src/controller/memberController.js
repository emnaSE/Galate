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

  return new Promise((resolve, reject) => {
    var msg = "";
    var sql = "INSERT INTO member SET ? ";
    const newMember = { firstname: firstname, lastname: lastname, email: email, age: age, pseudo: pseudo, password: password, civility: civility, id_school: id_school, id_clazz: id_clazz };
    con.query(sql, newMember, function (err, result) {
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
    con.query(sql, [firstname, lastname, email, age, pseudo, password, civility, id_school, id_clazz, id], function (err, result) {
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
    con.query(sql, [id], function (err, result) {
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

    con.query(sql, function (err, result) {
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
    con.query(sql, [pseudo, password], function (err, members) {
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
    con.query(sql, [idMember], function (err, result) {
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
    con.query(sql, newChoiceMember, function (err, result) {
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

      msg = createnewMemberChoices(choices, i, msg, reject, resolve);
      // return resolve(response);
    }
    ));
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
    con.query(sql, [id_question, id_answer, id_test_member, id], function (err, result) {
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
    con.query(sql, [id], function (err, result) {
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

    con.query(sql, function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};

_publics.getMemberByClass = (req) => {
  var idClazz = req.query.idClazz;
  return new Promise((resolve, reject) => {
    var sql = "select * FROM member where id_clazz=? ";
    con.query(sql, [idClazz], function (err, result) {
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
    con.query(sql, [id_school, id_clazz], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });

};
//test member 
_publics.createTestMembers = (testMembers) => {
  var testMembers = JSON.parse(testMembers);
  var id_test = testMembers.id_test;
  var id_member = testMembers.id_member;


  return new Promise((resolve, reject) => {
    var msg = "";
    var sql = "INSERT INTO test_member SET ? ";
    const newtestMembers = { id_test: id_test, id_member: id_member };
    con.query(sql, newtestMembers, function (err, result) {
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
    con.query(sql, [id_test, id_member, idTestMember], function (err, result) {
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
    con.query(sql, [idTestMember], function (err, result) {
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

    con.query(sql, [idMember], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};

_publics.getTestMemberByTestId = (req) => {
  var req = JSON.parse(req);
  var id_member = req.id_member;
  var id_test = req.id_test;

  return new Promise((resolve, reject) => {
    var sql = "select id as id FROM test_member where id_member=? and id_test=?";
    con.query(sql, [id_member, id_test], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });

};



_publics.getAllTestMembers = (req) => {

  return new Promise((resolve, reject) => {
    var sql = "select * FROM test_member";

    con.query(sql, function (err, result) {
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
    con.query(sql, [response, id], function (err, result) {
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

    con.query(sql, [id_test], function (err, result) {
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
    con.query(sql, [password], function (err, tests) {
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

function createnewMemberChoices(choices, i, msg, reject, resolve) {
  var sql = "select count(*) as size from choice_member where id_question=? and id_test_member=?  ";
  con.query(sql, [choices[i].id_question, choices[i].id_test_member], function (err, result) {

    if (err) {
      msg = "failure";
      reject(err);
    }
    else {
      var size = JSON.parse(JSON.stringify(result[0].size));

      if (size === 0) {
        var sql = "INSERT INTO choice_member SET id_question=?,id_answer=? ,id_test_member=?   ";
        con.query(sql, [choices[i].id_question, choices[i].id_answer, choices[i].id_test_member], function (err, result) {
          if (err) {
            msg = "failure";
            reject(err);
          }
          else {
            msg = "record added";
          }
          return resolve(msg);
        });
      }
      else {
        var sql = "update choice_member SET id_answer=? where id_question=? and id_test_member=?   ";
        con.query(sql, [choices[i].id_answer, choices[i].id_question, choices[i].id_test_member], function (err, result) {
          if (err) {
            msg = "failure";
            reject(err);
          }
          else {
            msg = "record updated";
          }
          return resolve(msg);
        });
      }
      // msg = "success";
    }
    //return resolve(msg);
  });
  return msg;
}

//get test En Cours 
_publics.getTestEnCours = (req) => {
  var date = new Date;
  var id_member = req.query.id_member;

  return new Promise((resolve, reject) => {
    var sql = " select * from test t left join test_clazz tc on (t.id=tc.id_test) left join member m on (tc.id_clazz=m.id_clazz) where m.id=? and activation_date < ? and expiration_date >?";
    con.query(sql, [id_member, date, date], function (err, result) {
      if (err) reject(err);
      return resolve(JSON.stringify(result));
    });
  });
};


module.exports = _publics;

