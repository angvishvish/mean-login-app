var express             = require('express');
var path                = require('path');
var favicon             = require('serve-favicon');
var logger              = require('morgan');
var passport            = require('passport');
var session             = require('express-session');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');

var mongoose            = require('mongoose');
// connect to mongodb
mongoose.connect('mongodb://localhost/mean-login-app');
require('./model/model');

var index               = require('./routes/index');
var api                 = require('./routes/api');
var authenticate        = require('./routes/authenticate')(passport);

var app                 = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/app/images/favicon.ico'));
app.use(logger('dev'));
app.use(session({
  secret: 'super duper secret'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));
app.use(passport.initialize());
app.use(passport.session());

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

app.use('/', index);
app.use('/api', api);
app.use('/auth', authenticate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    //allow all get request methods
    if(req.method === "GET"){
        return next();
    }
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/#login');
};
