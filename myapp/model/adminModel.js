var db = require('./db.js'); 
module.exports = {     
    read: function (email, callback) { 
        db.query(
            "select * from Administrateur where email= ?",email, function (err, results) { 
            if (err) throw err;
            callback(results);
            }
        );      
    },

    readall: function (callback) {
        db.query(
            "SELECT * FROM Administrateur", function (err, results) {             
                if (err) throw err;             
                callback(results);      
            }
        );      
    }, 
    areValid: function (email, password, callback) {         
        sql = "SELECT * FROM Administrateur WHERE email = ?";         
        db.query(sql, email, function (err, results) {             
            if (err) {
                callback(err);
            } else if (results.length == 1 && results[0].mot_de_passe == password) {                 
                callback(null, results[0]);             
            } else {                 
                callback(null, null);
            }         
        });       
    },
    delete: function(email, callback) {
        const sql = "DELETE FROM Administrateur WHERE email = ?";
        db.query(sql, email, function(err, results) {
          if (err) {
            console.error("Une erreur s'est produite lors de la suppression du candidat :", err);
            callback(err);
          } else {
            callback(null, results);
          }
        });
      },
    create: function(nom, prenom, email, date_creation, actif, tel, mot_de_passe, callback) {
        sql="INSERT INTO Administrateur (nom, prenom, email, date_creation, actif, tel, mot_de_passe) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(
            sql,
            [nom, prenom, email, date_creation, actif, tel, mot_de_passe],
            function (err, results) {
                if (err) throw err;
                callback(results);
            }
        );
    }
} 