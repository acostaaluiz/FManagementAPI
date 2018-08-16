var mysql=require('mysql');
 var connection=mysql.createPool({
 
host:'jdbc:mysql://localhost:3306/',
 user:'root',
 password:'',
 database:'fmanagement'
 
});

 module.exports=connection;