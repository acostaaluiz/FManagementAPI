'use strict';

const CategoryController = require('../db_mysql/controllers/categorycontroller');
var express = require('express');
var router = express.Router();

router.get('/checkcategory/:id?',function(req,res,next){

    console.log('######################### Iniciando checkcategory.');
 
    CategoryController.checkCategory(req.params.id, function(err, rows){

        if(!err){

            var numRows = rows.length;
            var categoryObj;
            var category;
            var response;

            if(numRows > 0){

                category = rows[0].category;
                response = "INVALID_CATEGORY";

                categoryObj = {

                    category: category,
                    response: response
                };

                res.json(categoryObj);


            } else {

                categoryObj = {

                    category: req.params.id,
                    response: "OK"
                };

                res.json(categoryObj);
            }
        } else
            res.json(err);
    });
});

router.get('/getallcategories/',function(req,res,next){
 
    CategoryController.getAllCategories(function(err, rows){

        if(!err){

            if(numRows > 0){

                var result = [];
                
                for (var category in rows) {

                    if (goals.hasOwnProperty(name)) {

                        result.push({

                            category: category.category, 
                            creation_data: category.creation_data,
                            last_update_data: category.last_update_data
                        });
                    }
                }

                res.json(result);
            } else
                res.json(err);
        }
    });
});

module.exports = router;