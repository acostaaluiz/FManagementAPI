'use strict';

const CategoryIncomeController = require('../db_mysql/controllers/categoryincomecontroller');
var express = require('express');
var router = express.Router();

router.get('/checkcategoryincome/:id?',function(req,res,next){

    console.log('######################### Iniciando checkcategoryincome.');
 
    CategoryIncomeController.checkCategoryIncome(req.params.id, function(err, rows){

        if(!err){

            var numRows = rows.length;
            var categoryIncomeObj;
            var categoryIncome;
            var response;

            if(numRows > 0){

                categoryIncome = rows[0].categoryIncome;
                response = "INVALID_CATEGORY_INCOME";

                categoryIncomeObj = {
                    categoryIncome: categoryIncome,
                    response: response
                };

                res.json(categoryIncomeObj);
            } else {

                categoryIncomeObj = {
                    categoryIncome: req.params.id,
                    response: "OK"
                };

                res.json(categoryIncomeObj);
            }
        } else
            res.json(err);
    });
});

module.exports = router;