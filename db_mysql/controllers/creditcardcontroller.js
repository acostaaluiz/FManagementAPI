var db = require('../dbconnection');
 
var CreditCard={
 
    getAllCreditCards:function(callback){
     
    return db.query("select creditcard, bank, creditcard_flag, creditcard_limit, creditcard_enddate, creditcard_price, creation_data, last_update_data from creditcard",callback);
    },
     checkCreditCard:function(id, callback){
     
    return db.query("select creditcard, creation_data, last_update_data from creditcard where creditcard = ?", [id], callback);
     },
     addCreditCard:function(CreditCard, callback){
    
     return db.query("insert into creditcard (creditcard, bank, creditcard_flag, creditcard_limit, creditcard_enddate, creditcard_price, creation_data, last_update_data) VALUES (?,?,?,?,?,?,?,?)", 
     [CreditCard.creditcard, 
        CreditCard.bank, 
        CreditCard.creditcard_flag,
        CreditCard.creditcard_limit,
        CreditCard.creditcard_enddate,
        CreditCard.creditcard_price,
        CreditCard.creation_data,
        CreditCard.last_update_data], 
        callback);
     },
     deleteCreditCard:function(id, callback){
    
      return db.query("delete from creditcard where creditcard = ?", [id], callback);
     }
    };

 module.exports = CreditCard;