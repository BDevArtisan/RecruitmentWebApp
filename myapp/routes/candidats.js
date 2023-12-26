var express = require('express');
var router = express.Router();
var candidatModel = require ('../model/candidatModel.js')

/* GET users listing. */

router.get('/', function (req, res, next) { 
  req.session.destroy(function(err) {
    if(err) {
        return next(err);
    } else {
      res.render('RegisterPage');
    }
  } );
});
router.post('/', function (req, res, next) { 
    const { prenom, nom, tel, email, mot_de_passe } = req.body;
    var currentDate = new Date();
    candidatModel.create(nom, prenom, email, currentDate, true, tel, mot_de_passe, function (err, results) {
      if (err) {
        console.error('Une erreur s\'est produite lors de la création du candidat :', err);
        res.status(500).send('Une erreur s\'est produite lors de l\'enregistrement.');
      } else {
        console.log('Candidat créé avec succès :', results);
        res.redirect('/dashboard');
      }
    });
  });
module.exports = router;
