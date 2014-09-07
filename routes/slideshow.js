var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var join = path.join;
var formidable = require('formidable');
var Slideshow = require('../model/index_slideshow');

router.get('/slides/upload', function(req, res){
  Slideshow.find({}, function(err, photos) {
    if (err) return next(err);
      res.render('slides/upload', {
        title: 'Upload photo for slideshow',
        current: 'slideupload',
        photos: photos
    });
  });
});

router.post('/slides/upload', function(req, res, next) {
  var form = new formidable.IncomingForm();
  
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files){
    if (err) return next(err);
    req.upload = {
      caption: fields['photo[caption]'],
      file: files['photo[image]']
    };
    next();
  });
});

router.post('/slides/upload', function(req, res, next) {
  debugger;
  
  var img = req.upload.file;
  var name = img.name;
  var caption = req.upload.caption || '';
  var path = join(__dirname, '..', 'public', 'images', 'slideshow', name);
  fs.rename(img.path, path, function(err){
    if (err) return next(err);
      
    Slideshow.create({
      caption: caption,
      path: img.name
    }, function (err) {
      if (err) return next(err);
      res.redirect('/');
    })
  })
  
});

module.exports = router;