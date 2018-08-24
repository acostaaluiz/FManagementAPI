'use strict';

const DateController = require('../db_mysql/controllers/datecontroller');
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

router.get('/getdatetimenow', function(req,res,next){

    console.log('######################### Iniciando getdatetimenow.');
 
    DateController.getDateTimeNow(req.params.id, function(err, rows){

        if(!err){
            var dateObj;

                dateObj = {

                    dateType: "NOW",
                    date: rows[0].dateTimeNow
                };

                res.json(dateObj);
        } else
            res.json(err);
    });
});

module.exports = router;