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
  console.log("Listening on http://" + ip + ":" + port);
  handler.handleRequest(request, response);

  // TODO: block ./favicon requests route a 404

  // setInterval(htmlfetcher.js, 60000)

});

server.listen(port, ip);
