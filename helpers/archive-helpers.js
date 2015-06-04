var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');


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

exports.readFile = function(path, callback){
  fs.readFile(path, function (err, fd) {
    if (err) throw err;
    fd = String(fd);
    callback(fd);
  });
};

exports.isUrlInList = function(url, callback){
  var contents;
  exports.readFile(exports.paths.list, function(data) {
    contents = data.split(',');
    callback(contents);
    // wherever we're calling isUrlInList, we will need to pass this logic into the callback
    // return contents.indexOf(url) > -1;
  });
};

exports.addUrlToList = function(url){
  debugger
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

exports.getWebsiteHtml = function (url, callback) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log("request to", url, "successful. html =",body) // Show the HTML for the input URL
      callback(body);
    }
  });
};

exports.downloadUrls = function(){

  exports.readFile(exports.paths.list, function (data) {
    list = data.split(',');

    _.each(list, function (url) {
      exports.isURLArchived(url, function (isArchived) {
        if(!isArchived) {
          exports.getWebsiteHtml(url, function(html) {
            var path = exports.paths.archivedSites + '/' + url;
            fs.writeFile(path, String(html), function(err) {
              if (err) throw err;
              console.log('successfully wrote html to', path);
            }); // end fs.writeFile
          }); // end getWebsiteHtml
        } // end if statement
      }); // end isURLArchived
    }); // end _.each
  }); // end readFile
}; // end downloadUrls





















