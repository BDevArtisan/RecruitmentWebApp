var express = require('express');
var router = express.Router();
var orgaModel = require ('../model/orgaModel.js');

/* GET users listing. */

router.get('/', function (req, res, next) { 
    orgaModel.readallaccepte(function(resacc){ 
        orgaModel.readallnonaccepte(function(resnon){ 
            if(req.session && req.session.user && (req.session.user.role == 'admin')){
                res.render('gestOrga', { role:req.session.user.role,orgas: resnon, orgasv: resacc});
            } else {
                /* page access */
                res.redirect('/login'); 
            }
        });
    });
});
router.get('/validate/:siren', function(req, res, next) {
    const siren = req.params.siren;
    
    // Suppression dans la table "Candidat"
    orgaModel.update(siren, function(err, results) {
        res.redirect('/gestOrga');
  });
});
router.get('/reject/:siren', function(req, res, next) {
    const siren = req.params.siren;
    orgaModel.delete(siren, function(err, results) {
        res.redirect('/gestOrga');
    });
});
module.exports = router;