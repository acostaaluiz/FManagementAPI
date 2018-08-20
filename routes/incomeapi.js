'use strict';

const IncomeController = require('../db_mysql/controllers/incomecontroller');
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

router.get('/getallincomes', function(req,res,next){
 
    IncomeController.getAllIncomes(function(err, rows){

        if(!err){

            var numRows = rows.length;

            if(numRows > 0){

                var result = [];

                for(var i = 0; i < numRows; i++){
                    
                    result.push({

                        income: rows[i].income, 
                        income_date: rows[i].income_date, 
                        income_todate: rows[i].income_todate, 
                        frequency_fk: rows[i].frequency_fk, 
                        categoryincome_fk: rows[i].categoryincome_fk, 
                        price: rows[i].price, 
                        creation_data: rows[i].creation_data,
                        last_update_data: rows[i].last_update_data
                    });
                }

                res.json(result);
            }

        } else
            res.json(err);
    });
});

router.post('/saveincome',function(req,res,next){
 
    IncomeController.addIncome(req.body,function(err,count){
        if(err)
            res.json(err);
        else{

            var incomeObj = {

                income: req.params.id,
                response: "OK"
             };

            res.json(incomeObj);
        }
    });
});

module.exports = router;