var db = require('./db.js'); 
module.exports = {     
    read: function (candidat, callback) { 
        db.query(
            "SELECT candidature.candidat, Offre_emploi.indication, Organisation.nom, candidature.date FROM candidature INNER JOIN Offre_emploi ON candidature.offre = Offre_emploi.numero INNER JOIN Organisation ON Offre_emploi.organisation = Organisation.siren WHERE candidature.candidat = ?", candidat, function (err, results) { 
            if (err) throw err;
            callback(results);
            }
        );      
    },
    readrecrut: function (recruteur, callback) { 
        db.query(
            "SELECT c.candidat, ca.nom, ca.prenom, o.indication FROM candidature c JOIN Candidat ca ON c.candidat = ca.email JOIN Offre_emploi o ON c.offre = o.numero WHERE o.recruteur = ?", recruteur, function (err, results) { 
            if (err) throw err;
            callback(results);
            }
        );      
    },
    
    

    readall: function (callback) {
        db.query(
            "select * from candidature", function (err, results) {             
                if (err) throw err;             
                callback(results);
            }
        );      
    },     
    areValid: function (candidat, offre, date, callback) {         
        sql = "select * from candidature where candidat= ? AND offre=? AND date=?";         
        rows = db.query(sql, candidat, offre, date, function (err, results) {             
            if (err) throw err;             
            if (rows.length == 1 && rows[0].pwd === password) {                 
                callback(true)             
            } 
            else {                 
                callback(false);             
            }         
        });       
    },      
    create: function(candidat, offre, date, callback) {
        sql="INSERT INTO candidature (candidat, offre, date) VALUES (?, ?, ?)";
        db.query(
            sql,
            [candidat, offre, date],
            function (err, results) {
                if (err) throw err;
                callback(results);
            }
        );
    }
} 