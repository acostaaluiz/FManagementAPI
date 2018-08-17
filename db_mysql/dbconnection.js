var mysql = require('mysql');
 var connection=mysql.createPool({
 
host:'localhost',
 user:'root',
 password:'',
 database:'fmanagement',
 port:3306
});

 module.exports=connection;