// make this an executable file
// chrontab set to execute this file every 1 minute

// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.


var archives = require('../helpers/archive-helpers.js');
var _ = require('underscore');
var fs = require('fs');

archives.downloadUrls();

