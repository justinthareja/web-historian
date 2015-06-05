var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var httpHelpers = require('./http-helpers.js');
var request = require('request');


exports.handleRequest = function (req, res) {
  if (req.method === 'POST' && req.url ==='/client-request') {
    var url = '';

    req.on('data', function (chunk) {
      url += chunk;
    });

    req.on('end', function () {
      url = url.split('=')[1];
      console.log('url=',url);

      archive.isURLArchived(url, function (isArchived) {
        console.log('---within isURLArchived callback---');
        console.log('isArchived =', isArchived);
        archive.isUrlInList(url, function(contents) {
          console.log('---within isURLInList callback---');
          console.log('contents=', contents);
          var isInList = contents.indexOf(url) > -1;
          if(isArchived) {
            var path = archive.paths.archivedSites + '/' + url;
            console.log('path=',path);
            archive.readFile(path, function(siteHtml) {
              console.log('---within readFile callback---');
              httpHelpers.sendResponse(res, 201, siteHtml);
            });
          } else if (!isInList) {
            archive.addUrlToList(url);
          } 
          if(!isArchived) {
            var path = archive.paths.siteAssets + '/loading.html';
            archive.readFile(path, function (loadingHtml) {
              httpHelpers.sendResponse(res, 200, loadingHtml);
            });
          }
        });
      });
    });
  }
  else if (req.method === 'GET') {
    archive.readFile(archive.paths.index, function (html) {
      httpHelpers.sendResponse(res, 200, html);
    });
  }
  else {
    httpHelpers.sendResponse(res, 404, null);
  }


};
