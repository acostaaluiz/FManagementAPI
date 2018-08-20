'use strict';

const ExpenseController = require('../db_mysql/controllers/expensecontroller');
var express = require('express');
var router = express.Router();
var secret_key = 'secret_key_fmanagement_F@';
var jwt = require('jsonwebtoken');

router.use(function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    const login = {
        id: req.params.id
    }

    const tkgenerated = jwt.sign({login}, secret_key);

    console.log('######################### Iniciando validacao.');
    console.log('######################### '  + tkgenerated);

    if (token) {

        jwt.verify(token, secret_key, function(err, decoded) {

          if (err) 
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          else {

            req.decoded = decoded; 
            next();

          }
        }); 
      } else {

        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
      }
});

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
                response = "INVALID_EXPENSE";

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

router.get('/getallexpenses',function(req,res,next){
 
    ExpenseController.getAllExpenses(function(err, rows){

        if(!err){

            var numRows = rows.length;

            if(numRows > 0){

                var result = [];

                for(var i = 0; i < numRows; i++){
                    
                    result.push({

                        expense: rows[i].expense, 
                        expenseDate: rows[i].expense_date, 
                        category: rows[i].category_fk, 
                        price: rows[i].price_fk, 
                        expenseFrequency: rows[i].frequency_fk, 
                        creationData: rows[i].creation_data,
                        lastUpdateData: rows[i].last_update_data
                    });
                }

                res.json(result);
            }

        } else
            res.json(err);
    });
});

router.post('/saveexpense',function(req,res,next){
 
    ExpenseController.addExpense(req.body,function(err,count){
        if(err)
            res.json(err);
        else{

            var expenseObj = {

                expense: req.params.id,
                response: "OK"
             };

            res.json(expenseObj);
        }
    });
});

router.delete('/deleteexpense/:id?',function(req,res,next){
 
    ExpenseController.deleteExpense(req.params.id,function(err,count){
     
        if(err)
        res.json(err);  
        else{
            var expenseObj = {

                expense: req.params.id,
                response: "OK"
            };

            res.json(expenseObj);
        }
    });
});

module.exports = router;