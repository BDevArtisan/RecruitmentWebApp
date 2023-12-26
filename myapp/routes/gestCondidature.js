var express = require('express');
var router = express.Router();
var candidatureModel = require ('../model/candidatureModel.js')
var multer = require('multer');
var uploadmodel= require('../model/uploadModel.js');

/* GET users listing. */
var my_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'mesfichiers');
  },
  filename: function (req, file, cb) {
    let my_extension = file.originalname.slice(file.originalname.lastIndexOf("."));
    cb(null, req.session.user.email + '-' + req.body.myFileType + my_extension);
  }
});

router.get('/', function (req, res, next) { 
    candidatureModel.readrecrut(req.session.user.email, function(result){ 
        if(req.session && req.session.user && (req.session.user.role == 'recruteur')){
            res.render('gestCondidature', {role:req.session.user.role,candidatures: result });
        } else {
            /* page access */
            res.redirect('/login'); 
        }
    });
});
router.get('/download/:user_email', function (req, res, next) { 
    uploadmodel.read(user_email, function(result){ 
        if(req.session && req.session.user && (req.session.user.role == 'recruteur')){
            res.download('./mesfichiers/' + result.file_path);
        } 
        else {
            /* page access */
            res.redirect('/login'); 
        }
    });
});
module.exports = router;