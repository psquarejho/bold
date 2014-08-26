var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/auth/google', passport.authenticate('google'));

router.get('/auth/google/return', 
  passport.authenticate('google', { successRedirect: '/user',
                                    failureRedirect: '/login' }));

router.get('/login', function(req,res){
  res.render('login', { title: 'Log in', current: 'login'});
});

router.get('/user', passport.authenticate('google', { successRedirect: '/user',
                                    failureRedirect: '/login' }),
      function(req, res) {
        res.render('user', {  title: 'User', current: 'user', });
      });

module.exports = router;