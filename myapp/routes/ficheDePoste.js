var express = require('express');
var router = express.Router();
var ficheModel = require ('../model/ficheModel.js')
var candidatureModel = require('../model/candidatureModel.js')
var uploadModel = require('../model/uploadModel.js')
var multer = require('multer');
var uploadedd_file = null

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
  
var upload = multer({ storage: my_storage });

router.get('/:numero', function(req, res) {
    if (req.session.uploaded_files == undefined) {
        req.session.uploaded_files = [];
    }    
    ficheModel.read(req.params.numero, function(fiche) {
        if(req.session && req.session.user){
                res.render('ficheDePoste', {role:req.session.user.role,fiche: fiche[0],files_array : req.session.uploaded_files, upload_error : 'Merci de sélectionner le fichier à charger !'});
        } else {
            /* page access */
            res.redirect('/login'); 
        }
    });
});
router.post('/:numero', upload.single('myFileInput') ,function(req, res, next) {
    const uploaded_file = req.file
    uploadedd_file=uploaded_file
    if (!uploaded_file) {
        ficheModel.read(req.params.numero, function(fiche) {
            if(req.session && req.session.user){
                    res.render('ficheDePoste', {role:req.session.user.role,fiche: fiche[0],files_array : req.session.uploaded_files, upload_error : 'Merci de sélectionner le fichier à charger !'});
            } else {
                /* page access */
                res.redirect('/login'); 
            }
        });
    } else {
        console.log(uploaded_file.originalname,' => ',uploaded_file.filename);
        req.session.uploaded_files.push(uploaded_file.filename);
        ficheModel.read(req.params.numero, function(fiche) {
            if(req.session && req.session.user){
                res.render('ficheDePoste',{role:req.session.user.role,fiche: fiche[0],files_array : req.session.uploaded_files, uploaded_filename : uploaded_file.filename, uploaded_original:uploaded_file.originalname});
            } else {
                /* page access */
                res.redirect('/login'); 
            }
        });
    }
  
});
  
router.get('/candidater/:numero', function(req, res) {
    var currentDate = new Date();
    if (req.session.uploaded_files.length>0){
        const fileData = {
            user_email: req.session.user.email,
            file_type: 'PDF',
            file_name: uploadedd_file.originalname,
            file_path: uploadedd_file.filename
          };
        uploadModel.create(fileData, function () {
            console.log("File data:", fileData);
              // Ajout du nom du fichier à la session
              req.session.uploaded_files.push(uploadedd_file.filename);
              candidatureModel.create(req.session.user.email, req.params.numero, currentDate, function (err, results) {
                console.log('candidature créée avec succès :', results);
                res.redirect('/dashboard');
            });
        });
    }
    else{
        res.redirect('/jobs/'+toString(req.params.numero))
    }
});
  

module.exports = router;