var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function (err, fd) {
    if (err) throw err;
    console.log('RAW fd', fd);
    fd = String(fd);
    console.log('stringified FD:', fd);
    callback(fd);
  });
};

exports.isUrlInList = function(url){
  var contents;
  exports.readListOfUrls(function(data) {
    contents = data.split(',');
  });
  return contents.indexOf(url) > -1;
};

exports.addUrlToList = function(url){
  fs.appendFile(exports.paths.list, url + ',', function (err) {
    if (err) throw err;
    console.log('The url '+ url +' was appended to ' + exports.paths.list);
  });
};


exports.isURLArchived = function(url, callback){
  fs.exists(exports.paths.archivedSites + '/' + url, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(){
  // read list of urls
  exports.readListOfUrls(function (data) {
    list = data.split(',');

    // iterates over the list
    _.each(list, function (url) {
      // at each url check to see if its archived
      exports.isURLArchived(url, function (isArchived) {

        if(!isArchived) {
          // GET request to url
          // archive HTML in archive/sites/URL-NAME-HERE
        }

      });
    });
  });
};
