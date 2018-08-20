'use strict';

const CategoryController = require('../db_mysql/controllers/categorycontroller');
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

router.get('/checkcategory/:id?', function(req,res,next){

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

router.get('/getallcategories',function(req,res,next){
 
    CategoryController.getAllCategories(function(err, rows){

        if(!err){

            var numRows = rows.length;

            if(numRows > 0){

                var result = [];

                for(var i = 0; i < numRows; i++){
                    
                    result.push({

                        category: rows[i].category, 
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

router.post('/savecategory',function(req,res,next){
 
    CategoryController.addCategory(req.body,function(err,count){
        if(err)
            res.json(err);
        else{

            var categoryObj = {

                category: req.params.id,
                response: "OK"
             };

            res.json(categoryObj);
        }
    });
});

module.exports = router;