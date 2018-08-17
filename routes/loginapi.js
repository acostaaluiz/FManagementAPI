var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

var secret_key = 'secret_key_fmanagement_F@';

router.post('/login/:id?', function(req, res){

    const login = {
        id: req.params.id
    }

    const token = jwt.sign({login}, secret_key);

    res.json({
        token: token
    });
});

module.exports = router;