/* jshint node: true */
'use strict';

var path = require('path');
var ProjectDataUpdater = require('./lib/project-data-updater.js');
var updateLock = require('file-locked-operation');
var hookshot = require('hookshot');
var packageInfo = require('./package.json');

module.exports.versionString = function() {
  return packageInfo.name + ' v' + packageInfo.version;
};

module.exports.launchServer = function(config) {
  var lockFilePath = path.resolve(config.workingDir, '.update-lock');
  var lock = new updateLock.FileLockedOperation(lockFilePath);

  hookshot('refs/heads/' + config.branch, function(info) {
    var updater = new ProjectDataUpdater(config, info.repository, lock);
    updater.pullChangesAndRebuild(info);
  }).listen(config.buildPort);

  hookshot('push', function(info) {
    var updater = new ProjectDataUpdater(config, info.repository, lock);
    updater.checkForAndImportUpdates(info);
  }).listen(config.updatePort);

  console.log('18F Team API: Listening on port ' + config.buildPort +
    ' for push events on ' + config.branch + ' and port ' + config.updatePort +
    ' for .about.yml updates.');
};
