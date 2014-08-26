var express = require('express');
var router = express.Router();

router.get('/user', function(req, res) {
  res.render('user', { 
    title: 'User',
    current: 'user',
     });
});

module.exports = router;
