'use strict';

const CategoryIncomeController = require('../db_mysql/controllers/categoryincomecontroller');
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

router.get('/checkcategoryincome/:id?',function(req,res,next){

    console.log('######################### Iniciando checkcategoryincome.');
 
    CategoryIncomeController.checkCategoryIncome(req.params.id, function(err, rows){

        if(!err){

            var numRows = rows.length;
            var categoryIncomeObj;
            var category_income;
            var response;

            if(numRows > 0){

                categoryIncome = rows[0].category_income;
                response = "INVALID_CATEGORY_INCOME";

                categoryIncomeObj = {
                    categoryIncome: category_income,
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

router.get('/getallincomecategories',function(req,res,next){
 
    CategoryIncomeController.getAllIncomeCategories(function(err, rows){

        if(!err){

            var numRows = rows.length;

            if(numRows > 0){

                var result = [];

                for(var i = 0; i < numRows; i++){
                    
                    result.push({

                        categoryIncome: rows[i].category_income, 
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

router.post('/savecategoryincome',function(req,res,next){
 
    CategoryIncomeController.addCategoryIncome(req.body,function(err,count){
        if(err)
            res.json(err);
        else{

            var categoryObj = {

                categoryIncome: req.params.id,
                response: "OK"
             };

            res.json(categoryObj);
        }
    });
});

router.delete('/deleteincomecategory/:id?',function(req,res,next){
 
    CategoryIncomeController.deleteCategoryIncome(req.params.id,function(err,count){
     
        if(err)
        res.json(err);  
        else{
            var categoryIncomeObj = {

                categoryIncome: req.params.id,
                response: "OK"
            };

            res.json(categoryIncomeObj);
        }
    });
});

module.exports = router;