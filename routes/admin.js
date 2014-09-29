var express = require('express');
var router = express.Router();
var User = require('../model/User');
var passport = require('passport');
var slideshow = require('./slideshow');



router.use(function(req,res,next) {
  if (!req.isAuthenticated()) {
    req.session.loginredirect = req.originalUrl;
    res.redirect('/login');
    return;
  }
  res.locals.mainpages.push({
        path: '/admin',
        name: 'admin',
        displayname: 'Admin'
      })
  return next();
});

router.get('/', function(req,res) {
  res.render('admin/admin', { current: 'admin'});
});

/* Other routes mapped to admin */
router.use(slideshow);


module.exports = router;