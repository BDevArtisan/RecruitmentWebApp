var express = require('express');
var router = express.Router();
var candidatModel = require ('../model/candidatModel.js');
var recruteurModel = require ('../model/recruteurModel.js');
var adminModel = require ('../model/adminModel.js');

/* GET users listing. */

router.get('/', function(req, res, next) {
    const perPage = 3; // Nombre d'utilisateurs par page
    const page = parseInt(req.query.page) || 1; // Page actuelle (récupérée depuis la requête)
  
    candidatModel.readall(function(rescandid) {
      recruteurModel.readall(function(resrecrut) {
        adminModel.readall(function(resadmin) {
          if (req.session && req.session.user && (req.session.user.role === 'admin')) {
            const users = rescandid;
            const recruteurs = resrecrut;
            const admins = resadmin;
  
            const totalUsers = users.length;
            const totalRecruteurs = recruteurs.length;
            const totalAdmins = admins.length;
  
            const totalPages = Math.ceil((totalUsers + totalRecruteurs + totalAdmins) / perPage);
  
            // Récupérer les utilisateurs pour la page actuelle
            const startIndex = (page - 1) * perPage;
            const endIndex = page * perPage;
  
            const paginatedUsers = users.slice(startIndex, endIndex);
            const paginatedRecruteurs = recruteurs.slice(startIndex, endIndex);
            const paginatedAdmins = admins.slice(startIndex, endIndex);
  
            res.render('dashAdmin', {
              role: req.session.user.role,
              users: paginatedUsers,
              recruteurs: paginatedRecruteurs,
              admins: paginatedAdmins,
              currentPage: page,
              totalPages: totalPages
            });
          } else {
            // Redirection vers la page de connexion si l'utilisateur n'est pas connecté ou n'est pas un administrateur
            res.redirect('/login');
          }
        });
      });
    });
  });
router.get('/:email', function(req, res, next) {
    const email = req.params.email;
    
    // Suppression dans la table "Candidat"
    candidatModel.delete(email, function(err, results) {
      if (err) {
        // Gérer l'erreur
        return res.status(500).send("Une erreur s'est produite lors de la suppression du candidat : " + err);
      }
      
      if (results.affectedRows > 0) {
        // Si une entrée a été supprimée dans la table "Candidat"
        res.redirect('/dashAdmin');
      } else {
        // Si aucune entrée n'a été trouvée dans la table "Candidat"
        // Poursuivre avec la suppression dans la table "Recruteur"
        recruteurModel.delete(email, function(err, results) {
          if (err) {
            // Gérer l'erreur
            return res.status(500).send("Une erreur s'est produite lors de la suppression du recruteur : " + err);
          }
          
          if (results.affectedRows > 0) {
            // Si une entrée a été supprimée dans la table "Recruteur"
            res.redirect('/dashAdmin');
          } else {
            // Si aucune entrée n'a été trouvée dans la table "Recruteur"
            // Poursuivre avec la suppression dans la table "Administrateur"
            adminModel.delete(email, function(err, results) {
              if (err) {
                // Gérer l'erreur
                return res.status(500).send("Une erreur s'est produite lors de la suppression de l'administrateur : " + err);
              }
              
              if (results.affectedRows > 0) {
                // Si une entrée a été supprimée dans la table "Administrateur"
                res.redirect('/dashAdmin');
              } else {
                // Si aucune entrée n'a été trouvée dans la table "Administrateur"
                return res.send("Aucune entrée trouvée avec l'e-mail " + email + ".");
              }
            });
          }
        });
      }
    });
  });
  

module.exports = router;