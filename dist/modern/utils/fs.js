'use strict';

exports.__esModule = true;
exports.watchDirectory = watchDirectory;
exports.readFileWithCache = readFileWithCache;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _chokidar = require('chokidar');

var chokidar = _interopRequireWildcard(_chokidar);

var _util = require('util.promisify');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

const readFile = (0, _util2.default)(fs.readFile);
function watchDirectory(dirName) {
  return chokidar.watch(dirName, {
    recursive: true,
    encoding: 'utf8',
    persistent: true
  });
}

async function readFileWithCache(fileCache, filePath) {
  let fileContents = fileCache.get(filePath);
  if (!fileContents) {
    fileContents = await readFile(filePath, 'utf8');
    fileCache.set(filePath, fileContents);
  }
  return fileContents;
}
