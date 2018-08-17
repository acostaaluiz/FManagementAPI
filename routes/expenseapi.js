'use strict';

const ExpenseController = require('../db_mysql/controllers/expensecontroller');
var express = require('express');
var router = express.Router();

router.get('/checkexpense/:id?',function(req,res,next){

    console.log('######################### Iniciando checkexpense.');
 
    ExpenseController.checkExpense(req.params.id, function(err, rows){

        if(!err){

            var numRows = rows.length;
            var expenseObj;
            var expense;
            var response;

            if(numRows > 0){

                expense = rows[0].expense;
                response = "INVALID_CREDITCARD";

                expenseObj = {
                    expense: expense,
                    response: response
                };

                res.json(expenseObj);
            } else {

                expenseObj = {
                    expense: req.params.id,
                    response: "OK"
                };

                res.json(expenseObj);
            }
        } else
            res.json(err);
    });
});