'use strict';

const IncomeController = require('../db_mysql/controllers/incomecontroller');
var express = require('express');
var router = express.Router();

router.get('/checkincome/:id?',function(req,res,next){

    console.log('######################### Iniciando checkincome.');
 
    ExpenseController.checkIncome(req.params.id, function(err, rows){

        if(!err){

            var numRows = rows.length;
            var incomeObj;
            var income;
            var response;

            if(numRows > 0){

                income = rows[0].income;
                response = "INVALID_INCOME";

                incomeObj = {
                    income: income,
                    response: response
                };

                res.json(incomeObj);
            } else {

                incomeObj = {
                    income: req.params.id,
                    response: "OK"
                };

                res.json(incomeObj);
            }
        } else
            res.json(err);
    });
});

module.exports = router;