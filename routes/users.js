var express = require('express');
var router = express.Router();
var User = require('../model/User');
var passport = require('passport')

router.get('/login', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  res.render('login', {
    loginerror: req.flash('error')
  });
});

router.get('/register', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.end('Error');
    }
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.end('OK');
    });
    
  });
});

router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
})

router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login', failureFlash: true }));

router.get('/currentuser', 
  function(req, res) {
    if (req.isAuthenticated()) {
      res.end(req.user.username);
    } else {
      res.end('');
    }
  });


module.exports = router;
