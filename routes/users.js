var express = require('express');
var router = express.Router();
var User = require('../model/User');
var passport = require('passport')

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.end('Error');
    }
    return res.end('OK');
  });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

router.get('/currentuser', 
  function(req, res) {
    if (req.isAuthenticated()) {
      res.end(req.user.username);
    } else {
      res.end('');
    }
  });


module.exports = router;
