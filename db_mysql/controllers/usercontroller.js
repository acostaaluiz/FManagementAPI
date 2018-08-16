var db = require('../dbconnection');
 
var User={
 
     checkUser:function(id, callback){
     
    return db.query("select user, password, email, telephone, creation_data, last_update_data where user = ?", [id], callback);
     },
     addUser:function(User, callback){
    
     return db.query("insert into user (user, email, password, telephone, creation_data, last_update_data) VALUES (?,?,?,?,?,?)", 
     [User.user, 
        User.email, 
        User.password,
        User.telephone,
        User.creation_data,
        User.last_update_data], 
        callback);
     },
     deleteUser:function(id, callback){
    
      return db.query("delete from user where user = ?", [id], callback);
     }
    };

 module.exports = User;
 