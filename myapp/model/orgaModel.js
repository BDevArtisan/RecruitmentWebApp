var db = require('./db.js'); 
module.exports = {     
    read: function (siren, callback) { 
        db.query(
            "select * from Organisation where siren= ?",siren, function (err, results) { 
            if (err) throw err;
            callback(results);
            }
        );      
    },

    readall: function (callback) {
        db.query(
            "SELECT * FROM Organisation", function (err, results) {             
                if (err) throw err;             
                callback(results);      
            }
        );      
    },
    readallaccepte: function (callback) {
        db.query(
            "SELECT * FROM Organisation WHERE accepte=TRUE", function (err, results) {             
                if (err) throw err;             
                callback(results);      
            }
        );      
    },
    readallnonaccepte: function (callback) {
        db.query(
            "SELECT * FROM Organisation WHERE accepte=FALSE", function (err, results) {             
                if (err) throw err;             
                callback(results);      
            }
        );      
    },      
    update: function (siren, callback) {
        db.query(
            "UPDATE Organisation SET accepte = ? WHERE siren = ?",
            [true, siren],
            function (err, results) {
                if (err) throw err;
                callback(results);
            }
        );
    }, 
    delete: function(siren, callback) {
        const sql = "DELETE FROM Organisation WHERE Organisation.siren = ?";
        db.query(sql, siren, function(err, results) {
          if (err) {
            console.error("Une erreur s'est produite lors de la suppression du candidat :", err);
            callback(err);
          } else {
            callback(null, results);
          }
        });
      },
    create: function(siren, nom, type, siege_social, callback) {
        sql="INSERT INTO Organisation (siren, nom, type, siege_social) VALUES (?, ?, ?, ?)";
        db.query(
            sql,
            [siren, nom, type, siege_social],
            function (err, results) {
                if (err) throw err;
                callback(results);
            }
        );
    }
} 