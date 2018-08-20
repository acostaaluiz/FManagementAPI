'use strict';

const CreditCardController = require('../db_mysql/controllers/creditcardcontroller');
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

router.get('/checkcreditcard/:id?',function(req,res,next){

    console.log('######################### Iniciando checkcreditcard.');
 
    CreditCardController.checkCreditCard(req.params.id, function(err, rows){

        if(!err){

            var numRows = rows.length;
            var creditCardObj;
            var creditCard;
            var response;

            if(numRows > 0){

                creditCard = rows[0].creditcard;
                response = "INVALID_CREDITCARD";

                creditCardObj = {
                    creditCard: creditCard,
                    response: response
                };

                res.json(creditCardObj);
            } else {

                creditCardObj = {
                    creditCard: req.params.id,
                    response: "OK"
                };

                res.json(creditCardObj);
            }
        } else
            res.json(err);
    });
});

router.get('/getallcreditcards',function(req,res,next){
 
    CreditCardController.getAllCreditCards(function(err, rows){

        if(!err){

            var numRows = rows.length;

            if(numRows > 0){

                var result = [];

                for(var i = 0; i < numRows; i++){
                    
                    result.push({

                        creditCard: rows[i].creditcard, 
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

router.post('/savecreditcard',function(req,res,next){
 
    CreditCardController.addCreditCard(req.body,function(err,count){
        if(err)
            res.json(err);
        else{

            var creditCardObj = {

                creditCard: req.params.id,
                response: "OK"
             };

            res.json(creditCardObj);
        }
    });
});

router.delete('/deletecreditcard/:id?',function(req,res,next){
 
    CreditCardController.deleteCreditCard(req.params.id,function(err,count){
     
        if(err)
        res.json(err);  
        else{
            var creditCardObj = {

                creditCard: req.params.id,
                response: "OK"
            };

            res.json(creditCardObj);
        }
    });
});

module.exports = router;