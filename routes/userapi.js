'use strict';

const UserController = require('../db_mysql/controllers/usercontroller');
var express = require('express');
var router = express.Router();
var secret_key = 'secret_key_fmanagement_F@';
var jwt = require('jsonwebtoken');

router.get('/checkuser/:id?/:password?/', function(req,res,next){

    console.log('######################### Iniciando checkuser.');
 
    UserController.checkUser(req.params.id, function(err, rows){

        if(!err){

            var numRows = rows.length;
            var userObj;

            if(numRows > 0){

                if(rows[0].password == req.params.password){

                    userObj = {

                        user: rows[0].user,
                        password: rows[0].password
                    }

                    const token = jwt.sign({userObj}, secret_key);
                    
                    console.log('######################### generatedtoken: ' + token);

                    userObj = {

                        user: rows[0].user,
                        response: "OK",
                        token: token
                    }

                } else{ 
                    userObj = {
                        user: rows[0].user,
                        response: "INVALID_PASSWORD"
                    }
                }
        
                res.json(userObj);

            } else {

                userObj = {

                    user: req.params.id,
                    response: "INVALID_USER"
                };

                res.json(userObj);
            }
        } else
            res.json(err);
    });
});

router.post('/saveuser',function(req,res,next){

    console.log('######################### Iniciando saveuser.');
 
    UserController.addUser(req.body,function(err,count){
        if(err)
            res.json(err);
        else{

            var userObj = {

                user: req.params.id,
                response: "OK"
             };

            res.json(userObj);
        }
    });
});

module.exports = router;