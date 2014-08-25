var evepraisal = require('./lib/evepraisal');

evepraisal("Nano-Facstory 12", function(err,data){
    console.log("Results:");
    console.log(data);
  });
