var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GooglePlusStrategy = require('passport-google-plus');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var buyback = require('./routes/buyback');
var secure = require('./routes/secure');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('teststring', JSON.stringify(process.env, null, 2));
app.set('mainpages', [
      { path: '/',         name: 'home',     displayname: 'Home'   },
      { path: '/team',     name: 'team',     displayname: 'Team'   },
      { path: '/buyback',  name: 'buyback',  displayname: 'Buyback'},
      { path: '/user',     name: 'user',     displayname: 'User'}
    ]);
  
app.set('lookuppath', function(name) {
  for (var i = 0; i < app.settings.mainpages.length; i++) {
    if (name === app.settings.mainpages[i].name) return app.settings.mainpages[i].displayname;
  }
  if (name == "info_newtobold")
    return "/info/newtobold";
})

passport.use(new GooglePlusStrategy({
    clientId: '511471210958-03esligoa1m3g71cfe4d2qn7kkkt1nce.apps.googleusercontent.com',
    clientSecret: 'D3NFhE4UroSGlbCIhTnjxVRp'
  },
  function(tokens, profile, done) {
    // Create or update user, call done() when complete...
    done(null, profile, tokens);
  }
));

passport.serializeUser(function(user, done) {
  done(null, 0);
});

passport.deserializeUser(function(id, done) {
  done(null, {name:'Tor Livar', id:'0'}); return;
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(favicon(path.join(__dirname, 'public', 'images', 'bold.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'bravo bold', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/', buyback);
app.use('/', secure);

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
