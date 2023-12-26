var express = require('express');
var router = express.Router();
var candidatModel = require ('../model/candidatModel.js')
var recruteurModel = require ('../model/recruteurModel.js')
var adminModel = require ('../model/adminModel.js')

router.get('/', function (req, res, next) { 
    if(req.session && req.session.user){
        res.redirect('/dashboard');  
    } else {
        res.render('login'); 
    }
});


router.post('/', function(req, res, next) {
    candidatModel.areValid(req.body.email, req.body.mot_de_passe, function(err, user) {
        if (err || !user) {
            recruteurModel.areValid(req.body.email, req.body.mot_de_passe, function(err, user) {
                if (err || !user) {
                    adminModel.areValid(req.body.email, req.body.mot_de_passe, function(err, user) {
                        if (err || !user) {
                            res.redirect('/login');
                        } 
                        else {
                            user.role = 'admin';
                            req.session.user = user;
                            res.redirect('/dashboard');
                        }
                    });
                } else {
                    user.role = 'recruteur';
                    req.session.user = user;
                    res.redirect('/dashboard');
                }
            });
        } else {
            user.role = 'candidat';
            req.session.user = user;
            res.redirect('/dashboard');
        }
    });
});


module.exports = router;