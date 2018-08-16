var db = require('../dbconnection');
 
var Category={
 
getAllCategories:function(callback){
 
return db.query("select category, creation_data, last_update_data from category",callback);
},
 checkCategory:function(id,callback){
 
return db.query("select category, creation_data, last_update_data from category where category = ?", [id], callback);
 },
 addCategory:function(Category,callback){

 return db.query("insert into category values(?, ?, ?)", [Category.category, Category.creation_data, Category.last_update_data], callback);
 },
 deleteCategory:function(id,callback){

  return db.query("delete from category where category = ?",[id],callback);
 }
};

 module.exports = Category;