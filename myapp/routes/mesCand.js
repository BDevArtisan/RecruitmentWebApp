var express = require('express');
var router = express.Router();
var candidatureModel = require ('../model/candidatureModel.js')


router.get('/', function (req, res, next) { 
    console.log(req.session.user.email);
    candidatureModel.read(req.session.user.email, function(result){ 
        if(req.session && req.session.user){
            res.render('mesCandidatures', {candidatures: result, role : req.session.user.role });
        } else {
            /* page access */
            res.redirect('/login'); 
        }
        
    });
});
module.exports = router;