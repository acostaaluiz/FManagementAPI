var db = require('../dbconnection');
var dateHelper = require('../../utility/date.helper.js');
 
var Income={
 
    getAllIncomes:function(callback){
     
    return db.query("select income, income_date, income_todate, frequency_fk, categoryincome_fk, price, creation_data, last_update_data from income",callback);
    },
     checkIncome:function(id, callback){
     
    return db.query("select income, creation_data, last_update_data where income = ?", [id], callback);
     },
     addIncome:function(Income, callback){

        var dateTimeNow = dateHelper.getDateTimeMySQLFormat();
    
        return db.query("insert into income (income, income_date, income_todate, frequency_fk, categoryincome_fk, price, creation_data, last_update_data) VALUES (?,?,?,?,?,?,?,?)", 
        [Income.income, 
            Income.income_date, 
            Income.income_todate,
            Income.frequency_fk,
            Income.categoryincome_fk,
            Income.price,
            dateTimeNow,
            dateTimeNow], 
        callback);
     },
     deleteIncome:function(id, callback){
    
      return db.query("delete from income where income = ?", [id], callback);
     }
    };

 module.exports = Income;
 