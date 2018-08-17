var db = require('../dbconnection');
 
var Expense={
 
    getAllExpenses:function(callback){
     
    return db.query("select expense, expense_date, category_fk, price, frequency_fk, creation_data, last_update_data from expense",callback);
    },
     checkExpense:function(id, callback){
     
    return db.query("select expense, creation_data, last_update_data where expense = ?", [id], callback);
     },
     addExpense:function(Expense, callback){
    
     return db.query("insert into expense (expense, expense_date, creditcard_fk, category_fk, price, frequency_fk, creation_data, last_update_data) VALUES (?,?,?,?,?,?,?,?)", 
     [Expense.expense, 
        Expense.expense_date, 
        Expense.creditcard_fk,
        Expense.category_fk,
        Expense.price,
        Expense.frequency_fk,
        Expense.creation_data,
        Expense.last_update_data], 
        callback);
     },
     deleteExpense:function(id, callback){
    
      return db.query("delete from expense where expense = ?", [id], callback);
     }
    };

 module.exports = Expense;
 