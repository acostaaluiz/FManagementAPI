'use strict';

var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var secret_key = 'secret_key_fmanagement_F@';

router.use(function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log('######################### Iniciando validacao.');

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



router.get('/login/:id?', function(req, res){

    console.log('######################### Iniciando login.');

    const login = {
        id: req.params.id
    }

    const token = jwt.sign({login}, secret_key);

    console.log('######################### ######################### TOKEN: ' + token);

    res.json({
        token: token
    });
});

module.exports = router;