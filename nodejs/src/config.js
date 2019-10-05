

  var mysql = require('mysql');


module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
   

    con : mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "wqtqVSROVpdhilqI00",
        //password: "tbEsNGfMcF8Htt7n",
        //password: "root",
        database: "galate7",
        port: 3306
    }),

    mediane: 6,



    // Initialize pool
      pool      :    mysql.createPool({
    connectionLimit : 100,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'wqtqVSROVpdhilqI00',
    database : 'galate7',
    debug    :  false
  }),  


  
  };
  
  