'use strict';

const CreditCardController = require('../db_mysql/controllers/creditcardcontroller');
var express = require('express');
var router = express.Router();

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

module.exports = router;