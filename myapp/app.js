var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.use(express.static('views'));
const session = require('express-session');

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


var candidatsRouter = require('./routes/candidats');
var dashboardRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var ficheRouter = require('./routes/ficheDePoste');
var candRouter = require('./routes/mesCand');
var monCompteRouter = require('./routes/monCompte');
var dashAdminRouter = require('./routes/dashAdmin');
var gestOrgaRouter = require('./routes/gestOrga');
var gestCandidatureRouter = require('./routes/gestCondidature');
var gestOffresRecrut = require('./routes/dashRecruteur');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  console.log('Session: ', req.session);
  next();
});

app.use('/', loginRouter);
app.use('/RegisterPage', candidatsRouter);
app.use('/nvUser', candidatsRouter);
app.use('/dashboard', dashboardRouter);
app.use('/login', loginRouter);
app.use('/log', loginRouter);
app.use('/logout', logoutRouter);
app.use('/jobs', ficheRouter);
app.use('/mesCandidatures', candRouter);
app.use('/monCompte', monCompteRouter);
app.use('/dashAdmin', dashAdminRouter);
app.use('/gestOrga', gestOrgaRouter);
app.use('/gestCandidature', gestCandidatureRouter);
app.use('/dashRecruteur', gestOffresRecrut);
app.use('/candidature/upload', ficheRouter);
app.use('/admin/delete/', dashAdminRouter);
app.use('/organisations/', gestOrgaRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Le serveur est lancé sur le port ${port}`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
