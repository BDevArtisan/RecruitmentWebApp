var express = require('express');
var router = express.Router();
var offreModel = require('../model/offreModel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const perPage = 3; // Nombre d'offres par page
  const page = parseInt(req.query.page) || 1; // Page actuelle (récupérée depuis la requête)
  
  offreModel.readalldashboard(function(result) {
    if (req.session && req.session.user) {
      const totalJobs = result.length;
      const totalPages = Math.ceil(totalJobs / perPage);
      
      // Récupérer les offres pour la page actuelle
      const startIndex = (page - 1) * perPage;
      const endIndex = page * perPage;
      const jobs = result.slice(startIndex, endIndex);
      
      res.render('dashboard', {
        username: req.session.user.nom,
        jobs: jobs,
        role: req.session.user.role,
        currentPage: page,
        totalPages: totalPages
      });
    } else {
      // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
      res.redirect('/login');
    }
  });
});

module.exports = router;
