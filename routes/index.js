var express = require('express');
var router = express.Router();

var mainpages = [
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
    
var lookuppath = function(name) {
  for (var i = 0; i < mainpages.length; i++) {
    if (name === mainpages[i].name) return mainpages[i].displayname;
  }
  if (name == "info_newtobold")
    return "/info/newtobold";
}


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
    title: 'Home',
    pages: mainpages,
    current: 'home',
    path: lookuppath
     });
});

router.get('/buyback', function(req, res) {
  res.render('buyback', {
    title: 'Buyback program',
    pages: mainpages,
    current: 'buyback',
    path: lookuppath
  });
});

router.get('/info/newtobold', function(req, res) {
  res.render('newtocorp', {
    title: 'New to corp',
    pages: mainpages,
    current: 'info_newtobold',
    path: lookuppath
  })
})

module.exports = router;
