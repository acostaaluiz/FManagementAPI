var db=require('../dbconnection');
var dateHelper = require('../../utility/date.helper.js');
 
var CategoryIncome={
 
    getAllIncomeCategories:function(callback){
     
    return db.query("select category_income, creation_data, last_update_data from categoryincome", callback);
    },
     checkCategoryIncome:function(id, callback){
     
    return db.query("select category_income, creation_data, last_update_data from categoryincome where category_income = ?", [id], callback);
     },
     addCategoryIncome:function(CategoryIncome, callback){

        var dateTimeNow = dateHelper.getDateTimeMySQLFormat();
    
        return db.query("insert into categoryincome values(?, ?, ?)", [CategoryIncome.category_income, dateTimeNow, dateTimeNow], callback);
     },
     deleteCategoryIncome:function(id,callback){
    
      return db.query("delete from categoryincome where category = ?",[id],callback);
     }
    };

 module.exports = CategoryIncome;