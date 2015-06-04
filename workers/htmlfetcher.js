// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var archives = require('../helpers/archive-helpers.js');
var _ = require('underscore');
var fs = require('fs');


exports.downloadUrls = function(){
  console.log('downloadUrls called');

  archives.readFile(archives.paths.list, function (data) {
    list = data.split(',');
    console.log('list =', list);
    _.each(list, function (url) {
      archives.isURLArchived(url, function (isArchived) {
        console.log('isArchived =', isArchived, 'url =', url);
        if(!isArchived) {
          console.log('not archived, fetching from internet');
          archives.getWebsiteHtml(url, function(html) {
            console.log('in archives.getWebsiteHtml callback, url = ', url);
            // remove special characters
            var notSoSpecialUrl = url.split('://').join('').split('.').join('');
            var path = archives.paths.archivedSites + '/' + notSoSpecialUrl + '.html';
            // TODO: refactor this janky shit
            fs.appendFile(path, String(html), function(err) {
              if (err) {
                console.log(err);
                console.log('path=', path);
                // throw err;
              }
              console.log('Successfully wrote html to', path);
            }); // end fs.writeFile
          }); // end getWebsiteHtml
        } // end if statement
      }); // end isURLArchived
    }); // end _.each
  }); // end readFile
}; // end downloadUrls



