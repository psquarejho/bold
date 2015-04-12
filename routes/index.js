var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var http = require('https');
var imgcache = require('./../lib/imagecache');
var Slideshow = require('../model/index_slideshow');
var flash = require('connect-flash');
var passport = require('passport');



router.use(function(req,res,next) {
  if (req.isAuthenticated()){
    res.locals.username = req.user.username;
  } else {
    res.locals.username = "";
  }
  
  res.locals.mainpages = [
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
    
  res.locals.lookuppath = function(name) {
      for (var i = 0; i < res.locals.mainpages.length; i++) {
        if (name === res.locals.mainpages[i].name) return res.locals.mainpages[i].displayname;
      }
      if (name == "info_newtobold")
        return "/info/newtobold";
    };
  res.locals.title = "BO_LD";
  res.locals.current = "";
  return next();
})

/* GET home page. */
router.get('/', function(req, res) {
  Slideshow.find({}, function(err, photos) {
    debugger;
      res.render('index', { 
        title: 'Home',
        current: 'home',
        photos: photos
         });
   });
});

router.get('/buyback', function(req, res) {
  res.render('buyback', {
    title: 'Buyback program',
    current: 'buyback',
  });
});


router.get('/info/newtobold', function(req, res) {
  res.render('newtocorp', {
    title: 'New to corp',
    current: 'info_newtobold',
  });
});

router.param('eve_id', function (req, res, next, id) {
  if (parseInt(id).toString() == id) {
    req.eve_id = id;
    next(null);
  } else {
    next(new Error('ID is not a number'));
  } 
  
});

router.get('/eveimages/:eve_id', function(req, res){
  imgcache(req.eve_id, res);
});

router.get('/team', function(req, res) {
  var managersFile = path.join(__dirname, '..', 'model', 'managers.json');

  fs.exists(managersFile, function(exists) {
    if (exists) {
      fs.readFile(managersFile, 'utf8', function(err, data) {
        if (err) throw err;
        var dataa = data.toString();
        var managers = JSON.parse(dataa || '[]');
        res.render('structure', {
          title: 'The Team',
          current: 'team',
          managers: managers
        }); 
      });
    } else {
      res.statusCode = 500;
      res.end("Missing managers.json file");
    }
  });
});

module.exports = router;
