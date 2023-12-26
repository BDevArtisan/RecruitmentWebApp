var db = require('./db.js'); 
module.exports = {     
    read: function (numero, callback) { 
        db.query(
            "select * from Offre_emploi where numero= ?",numero, function (err, results) { 
            if (err) throw err;
            callback(results);
            }
        );      
    },

    readall: function (callback) {
        db.query(
            "select * from Offre_emploi", function (err, results) {             
                if (err) throw err;             
                callback(results);          
            }
        );      
    },   

    readalldashboard: function (callback) {
        db.query(
            "SELECT Offre_emploi.*, Organisation.nom FROM Offre_emploi JOIN Organisation ON Offre_emploi.organisation = Organisation.siren WHERE Offre_emploi.etat = 'publié'", 
            function (err, results) {             
                if (err) throw err;             
                callback(results);          
            }
        );      
    },
    readallrecruteurvalide: function (recruteur, callback) {
        db.query(
            "select * from Offre_emploi WHERE Offre_emploi.etat = 'publié' and Offre_emploi.recruteur= ? ", recruteur,
            function (err, results) {             
                if (err) throw err;             
                callback(results);          
            }
        );      
    },
    readallrecruteurnonvalide: function (recruteur, callback) {
        db.query(
            "SELECT Offre_emploi.* FROM Offre_emploi WHERE Offre_emploi.etat != 'publié' and Offre_emploi.recruteur= ? ", recruteur,
            function (err, results) {             
                if (err) throw err;             
                callback(results);          
            }
        );      
    }, 
    create: function(numero, indication, etat, date_de_validite, recruteur, organisation, callback) {
        sql="INSERT INTO Offre_emploi (numero, indication, etat, date_de_validite, recruteur, organisation) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(
            sql,
            [numero, indication, etat, date_de_validite, recruteur, organisation],
            function (err, results) {
                if (err) throw err;
                callback(results);
            }
        );
    }
} 