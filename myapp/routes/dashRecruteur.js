var express = require('express');
var router = express.Router();
var offreModel = require ('../model/offreModel.js')

/* GET users listing. */

router.get('/', function (req, res, next) { 
    offreModel.readallrecruteurvalide(req.session.user.email, function(result1){ 
        offreModel.readallrecruteurnonvalide(req.session.user.email, function(result2){ 
            if(req.session && req.session.user && (req.session.user.role == 'recruteur')){
                    res.render('dashRecruteur', {role:req.session.user.role,validOffers: result1, expiredOffers :result2});
            } else {
                /* page access */
                res.redirect('/login'); 
            }
        });
    });
});
module.exports = router;