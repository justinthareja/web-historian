var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};



// web server needs 2 checks
  // if it's archived?
    // serve archived html file
    // res.end()
  // else if in the list?
    // don't add it to the list
  // else
    // add it to the list
  // send loading.html

