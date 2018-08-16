var db = require('../dbconnection');
 
var Frequency={
 
    getDateTimeNow:function(callback){
     
    return db.query("select NOW() as dateTimeNow ",callback);
    }
};

 module.exports = Frequency;
 