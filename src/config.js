

  var mysql = require('mysql');


module.exports = {
    port: process.env.PORT || 3003,
    env: process.env.NODE_ENV || 'development',
   

    con : mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "wqtqVSROVpdhilqI00",
        database: "galate",
        port: 3306
    })
  };
  