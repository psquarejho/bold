var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var http = require('https');
var imgcache = require('./../lib/imagecache');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
    title: 'Home',
    current: 'home',
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
