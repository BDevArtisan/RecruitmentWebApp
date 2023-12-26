var db = require('./db.js'); 
module.exports = {     
    read: function (numero, callback) { 
        db.query(
            "select * from fiche_de_poste where numero= ?",numero, function (err, results) { 
            if (err) throw err;
            callback(results);
            }
        );      
    },

    readall: function (callback) {
        db.query(
            "select * from fiche_de_poste", function (err, results) {             
                if (err) throw err;             
                callback(results);          
            }
        );      
    },          
} 