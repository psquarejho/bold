var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var buyback = require('./routes/buyback');
var slideshow = require('./routes/slideshow');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.mainpages = [
      {
        path: '/',
        name: 'home',
        displayname: 'Home'
      },
      {
        path: '/team',
        name: 'team',
        displayname: 'Team'
      },
      {
        path: '/buyback',
        name: 'buyback',
        displayname: 'Buyback'
      }
    ];
app.locals.lookuppath = function(name) {
      for (var i = 0; i < app.locals.mainpages.length; i++) {
        if (name === app.locals.mainpages[i].name) return app.locals.mainpages[i].displayname;
      }
      if (name == "info_newtobold")
        return "/info/newtobold";
    };

app.use(favicon(path.join(__dirname, 'public', 'images', 'bold.ico')));
app.use(logger('dev'));
app.use(session({
    secret: 'aløsjd fløaøljk os fpae afø ølsjf aø se ds',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      db : 'boldsite',
    })
  }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', buyback);
app.use('/admin/', slideshow);

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
