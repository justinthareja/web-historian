var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var httpHelpers = require('./http-helpers.js')

exports.handleRequest = function (req, res) {
  // console.log('request url =', request.url);
  // console.log('url path =', parseURL.parse(request.url).path);

  // debugger
  // if(request.method === 'OPTIONS') {
  //   response.writeHead(200, httpHelpers.headers);
  //   response.end();
  // }

  //POST REQUESTS:::::
  var url = '';

  request.on('data', function (chunk) {
    url += chunk;
  });

  request.on('end', function () {
    archive.isURLArchived(url, function (isArchived) {
      archive.isUrlInList(url, function(contents) {
        var isInList = contents.indexOf(url) > -1;
        if(isArchived) {
          var path = archive.paths.archivedSites + '/' + url;
          archive.readFile(path, function(siteHtml) {
            httpHelpers.sendResponse(res, 201, siteHtml)
          });
        } else if (!isInList) {
          archive.addUrlToList(url);
        }
        // send loading.html
        var path = archive.paths.siteAssets + '/loading.html';
        archive.readFile(path, function (loadingHtml) {
          httpHelpers.sendResponse(res, 200, path);
        })
      });
    })
  });

  // res.end(archive.paths.list);
};


