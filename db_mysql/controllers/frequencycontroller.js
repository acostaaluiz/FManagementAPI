var db = require('../dbconnection');
 
var Frequency={
 
    getAllFrequencies:function(callback){
     
    return db.query("select position, frequency from frequency",callback);
    }
};

 module.exports = Frequency;
 