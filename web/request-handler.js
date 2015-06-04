var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var httpHelpers = require('./http-helpers.js');


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

  req.on('data', function (chunk) {
    url += chunk;
  });


  req.on('end', function () {

    // split the "url=" part out of the url
    url = url.split('=')[1];
    console.log('url is', url);

    archive.isURLArchived(url, function (isArchived) {
      archive.isUrlInList(url, function(contents) {
        var isInList = contents.indexOf(url) > -1;
        if(isArchived) {
          var path = archive.paths.archivedSites + '/' + url;
          archive.readFile(path, function(siteHtml) {
            httpHelpers.sendResponse(res, 201, siteHtml);
          });
        } else if (!isInList) {
          archive.addUrlToList(url);
        }
        // send loading.html
        var loadingPath = archive.paths.siteAssets + '/loading.html';
        archive.readFile(loadingPath, function (loadingHtml) {
          // TODO: stop the route to localhost:8080
          // TODO: display proper loading.html on client
          httpHelpers.sendResponse(res, 200, loadingPath);
        });
      });
    });
  });

  // res.end(archive.paths.list);
};


