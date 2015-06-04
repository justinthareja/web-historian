var fs = require('fs');
var htmlFetcher = require('../workers/htmlfetcher.js');
var request = require('request');
var archives = require('../helpers/archive-helpers.js');

// Sync is ok here because this is called just once on startup.
module.exports = function () {
  // if the archive folder doesn't exist, create it.
  if (!fs.existsSync("./archives")) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync("./archives");
  }

  // if the file doesn't exist, create it.
  if (!fs.existsSync("./archives/sites.txt")) {
    // We use fs.openSync to create the file
    var file = fs.openSync("./archives/sites.txt", "w");
    fs.closeSync(file);
  }

  // if the folder doesn't exist, create it.
  if (!fs.existsSync("./archives/sites")) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync("./archives/sites");
  }

  // cache urls in sites.txt
  htmlFetcher.downloadUrls();

  // var url = 'http://www.google.com';
  // request(url, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     console.log("successfully pinged:", url);
  //     var path = archives.paths.archivedSites+'/test.txt';
  //     fs.appendFile(path, body, function(err) {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.log("successfully wrote to:", path);
  //     });
  //   }
  // });

};


