var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var User = require('./model/User');

var routes = require('./routes/index');
var users = require('./routes/users');
var buyback = require('./routes/buyback');
var admin = require('./routes/admin');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/boldsite');

var passport = require('passport');

debugger;
// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'images', 'bold.ico')));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser('aløsjd fløaøljk os fpae afø ølsjf aø se ds'));
app.use(session({
    secret: 'aløsjd fløaøljk os fpae afø ølsjf aø se ds',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      db : 'boldsite',
    })
  }));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Make sure all views have access to username
app.use(function(req,res,next) {
  if (req.isAuthenticated()){
    res.locals.username = req.user.username;
  } else {
    res.locals.username = "";
  }
  return next();
})

app.use('/', routes); // THIS MUST BE FIRST
app.use('/', users);
app.use('/', buyback);
app.use('/admin/', admin);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
