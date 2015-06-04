var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var archiveHelpers = require("../helpers/archive-helpers.js");
var parseURL = require('url');

// Why do you think we have this here?
// HINT:It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function (request, response) {
  console.log('request body =', request.body);
  console.log('request url =', request.url);
  console.log('url path =', parseURL.parse(request.url).path);

  //POST REQUESTS:::::
  var data = '';
  request.on('data', function (chunk) {
    data += chunk;
  });
  request.on('end', function () {
    //DO WHAT WE WANT TO DO WITH INCOMING URL (data)
  });
  //::::::::::::::::
  archiveHelpers.addUrlToList();
  archiveHelpers.downloadUrls();

  handler.handleRequest(request, response);
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
