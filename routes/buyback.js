var express = require('express');
var router = express.Router();
var evepraisal = require('../lib/evepraisal')

/* GET users listing. */
router.post('/buyback',function(req, res) {
  //res.end(req.body.raw_paste + '\n'); return;
  evepraisal(req.body.raw_paste, function(err,data){
    if (err) {
      res.statusCode = 500;
      res.end("Error parsing input data");
    }
    if (data && data.totals && data.totals.buy)
      res.end((data.totals.buy * 0.85).toFixed(2));
    else
      res.end("0.00");
  });
});

module.exports = router;
