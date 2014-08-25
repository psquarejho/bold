/**
 * @author Tor Livar Flugsrud
 */
var querystring = require('querystring');
var http = require('http');
var request = require('request');

function postData(data, callback) {
  var post_data = querystring.stringify({
    raw_paste: data,
    market: 30000142
  });
  
  var post_options = {
    host: 'evepraisal.com',
    port: '80',
    path: '/estimate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
    }
  };
  
  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      found = false;
      res.on('error'), function (err) {
        callback(err);
      });
      res.on('data', function (chunk) {
          if (!found) {
            m = chunk.match("#([0-9]+) ");
            if (m){
              found = true;
              var id = m[1];
              readEvepraisalId(id, callback);
            }
          }
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
}

function readEvepraisalId(id, callback) {
  var url = 'http://evepraisal.com/e/' + id + '.json';
  request({
    url: url,
    json: true
}, function (error, response, body) {
    if (error) {
      callback (error);
    } else if (response.statusCode !== 200) {
      callback (new Error('Wrong return code');
    }
    else {
        callback (null, body);
    }
})
}

module.export = postData;

