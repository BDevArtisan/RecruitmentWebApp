var express = require('express');
var router = express.Router();
var candidatModel = require('../model/candidatModel.js');
var adminModel = require('../model/adminModel.js');
var recruteurModel = require('../model/recruteurModel.js');



router.get('/', function (req, res, next) {
  candidatModel.read(req.session.user.email, function (result) {
    if (result.length == 1) {
      if (req.session && req.session.user) {
          res.render('monCompte', {role: req.session.user.role, user: result[0]});
        }
      else{
        res.redirect('/login');
      }     
    }
    else {
      adminModel.read(req.session.user.email, function (result) {
        if (result.length == 1) {
          if (req.session && req.session.user) {
              res.render('monCompte', {role: req.session.user.role, user: result[0]});
          }
          else{
            res.redirect('/login');
          }
        }
        else {
          recruteurModel.read(req.session.user.email, function (result) {
            if (result.length == 1) {
              if (req.session && req.session.user) {
                  res.render('monCompte', {role: req.session.user.role, user: result[0]});
              }
              else{
                  res.redirect('/login');
              }
            } 
          });
        }
      });
    }
  });
});

module.exports = router;
