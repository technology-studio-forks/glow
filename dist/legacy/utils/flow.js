'use strict';

exports.__esModule = true;
exports.status = exports.getFlowConfig = exports.getFlowConfigPath = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var flow = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee(path, cwd, args) {
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return (0, _spawndamnit2.default)(path, args, { cwd });

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
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

  return function flow(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var getStdout = (function() {
  var _ref2 = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee2(
      path,
      rootDir,
      args
    ) {
      var stdout, res;
      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                stdout = void 0;
                _context2.prev = 1;
                _context2.next = 4;
                return flow(path, rootDir, args);

              case 4:
                res = _context2.sent;

                stdout = res.stdout;
                _context2.next = 15;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](1);

                if (
                  !(
                    _context2.t0 instanceof
                    _spawndamnit2.default.ChildProcessError
                  )
                ) {
                  _context2.next = 14;
                  break;
                }

                stdout = _context2.t0.stdout;
                _context2.next = 15;
                break;

              case 14:
                throw _context2.t0;

              case 15:
                return _context2.abrupt('return', stdout.toString());

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        this,
        [[1, 8]]
      );
    })
  );

  return function getStdout(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

var getJSON = (function() {
  var _ref3 = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee3(
      path,
      rootDir,
      args
    ) {
      var stdout;
      return _regenerator2.default.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.next = 2;
                return getStdout(path, rootDir, [].concat(args, ['--json']));

              case 2:
                stdout = _context3.sent;
                return _context3.abrupt('return', JSON.parse(stdout));

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        },
        _callee3,
        this
      );
    })
  );

  return function getJSON(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
})();

var getFlowConfigPath = (exports.getFlowConfigPath = (function() {
  var _ref4 = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee4(cwd) {
      return _regenerator2.default.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                _context4.next = 2;
                return (0, _findUp2.default)('.flowconfig', { cwd });

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        },
        _callee4,
        this
      );
    })
  );

  return function getFlowConfigPath(_x10) {
    return _ref4.apply(this, arguments);
  };
})());

var getFlowConfig = (exports.getFlowConfig = (function() {
  var _ref5 = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee5(flowRootDir) {
      var _iterator, _isArray, _i, _ref6, _path;

      return _regenerator2.default.wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                (_iterator = getPossibleFlowBinPaths(flowRootDir)),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 1:
                if (!_isArray) {
                  _context5.next = 7;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt('break', 22);

              case 4:
                _ref6 = _iterator[_i++];
                _context5.next = 11;
                break;

              case 7:
                _i = _iterator.next();

                if (!_i.done) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt('break', 22);

              case 10:
                _ref6 = _i.value;

              case 11:
                _path = _ref6;
                _context5.prev = 12;
                _context5.next = 15;
                return getJSON(_path, flowRootDir, ['version']);

              case 15:
                return _context5.abrupt('return', _context5.sent);

              case 18:
                _context5.prev = 18;
                _context5.t0 = _context5['catch'](12);

              case 20:
                _context5.next = 1;
                break;

              case 22:
                return _context5.abrupt('return', null);

              case 23:
              case 'end':
                return _context5.stop();
            }
          }
        },
        _callee5,
        this,
        [[12, 18]]
      );
    })
  );

  return function getFlowConfig(_x11) {
    return _ref5.apply(this, arguments);
  };
})());

var status = (exports.status = (function() {
  var _ref7 = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee6(env) {
      return _regenerator2.default.wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                _context6.next = 2;
                return getJSON(env.flowBinPath, env.flowRootDir, ['status']);

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        },
        _callee6,
        this
      );
    })
  );

  return function status(_x12) {
    return _ref7.apply(this, arguments);
  };
})());

exports.getFlowRootDir = getFlowRootDir;
exports.getPossibleFlowBinPaths = getPossibleFlowBinPaths;

var _spawndamnit = require('spawndamnit');

var _spawndamnit2 = _interopRequireDefault(_spawndamnit);

var _Env = require('../Env');

var _findUp = require('find-up');

var _findUp2 = _interopRequireDefault(_findUp);

var _path2 = require('path');

var path = _interopRequireWildcard(_path2);

var _Lang = require('../Lang');

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

function getFlowRootDir(flowConfigPath) {
  return path.dirname(flowConfigPath);
}

function getPossibleFlowBinPaths(flowRootDir) {
  return [path.join(flowRootDir, 'node_modules', '.bin', 'flow'), 'flow'];
}
