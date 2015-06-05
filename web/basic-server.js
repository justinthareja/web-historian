var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var archiveHelpers = require("../helpers/archive-helpers.js");
var httpHelpers = require("./http-helpers");
var parseURL = require('url');

// Why do you think we have this here?
// HINT:It has to do with what's in .gitignore
// debugger;
initialize();


// var port = 8080;
var port = 3000; // swaped for testing
var ip = "127.0.0.1";


var server = http.createServer(function (request, response) {
  handler.handleRequest(request, response);
});


console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
