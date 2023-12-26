var db = require('./db.js'); 
module.exports = {  
    read: function(email, callback) {
        db.query(
            "SELECT * FROM uploaded_files WHERE uploaded_files.user_email = ?",
            email,
            function(err, results) {
                if (err) {
                    throw err;
                }
                callback(err, results);
            }
        );
    },    
    create: function(fileData, callback) {
        sql="INSERT INTO uploaded_files (user_email, file_type, file_name, file_path) VALUES (?, ?, ?, ?)";
        db.query(
            sql,
            [fileData.user_email, fileData.file_type, fileData.file_name, fileData.file_path],
            function (err, results) {
                if (err) throw err;
                callback(results);
            }
        );
    }
}