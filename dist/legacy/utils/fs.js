'use strict';

exports.__esModule = true;
exports.readFileWithCache = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var readFileWithCache = (exports.readFileWithCache = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee(
      fileCache,
      filePath
    ) {
      var fileContents;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                fileContents = fileCache.get(filePath);

                if (fileContents) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return readFile(filePath, 'utf8');

              case 4:
                fileContents = _context.sent;

                fileCache.set(filePath, fileContents);

              case 6:
                return _context.abrupt('return', fileContents);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this
      );
    })
  );

  return function readFileWithCache(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

exports.watchDirectory = watchDirectory;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _chokidar = require('chokidar');

var chokidar = _interopRequireWildcard(_chokidar);

var _util = require('util.promisify');

var _util2 = _interopRequireDefault(_util);

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var readFile = (0, _util2.default)(fs.readFile);
function watchDirectory(dirName) {
  return chokidar.watch(dirName, {
    recursive: true,
    encoding: 'utf8',
    persistent: true
  });
}
