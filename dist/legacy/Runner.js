'use strict';

exports.__esModule = true;
exports.Runner = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(
  _possibleConstructorReturn2
);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _Env = require('./Env');

var _Interface = require('./Interface');

var _flow = require('./utils/flow');

var flow = _interopRequireWildcard(_flow);

var _fs = require('./utils/fs');

var fs = _interopRequireWildcard(_fs);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

require('./types');

var _multimatch = require('multimatch');

var _multimatch2 = _interopRequireDefault(_multimatch);

var _path = require('path');

var path = _interopRequireWildcard(_path);

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

var Runner = (exports.Runner = (function(_EventEmitter) {
  (0, _inherits3.default)(Runner, _EventEmitter);

  function Runner(opts) {
    (0, _classCallCheck3.default)(this, Runner);

    var _this = (0, _possibleConstructorReturn3.default)(
      this,
      _EventEmitter.call(this)
    );

    _this.env = opts.env;
    _this.running = false;
    _this.changed = false;
    return _this;
  }

  Runner.prototype.start = (function() {
    var _ref = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee() {
        var _this2 = this;

        var watcher;
        return _regenerator2.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  if (this.env.watch) {
                    watcher = fs.watchDirectory(this.env.flowRootDir);

                    watcher.on(
                      'change',
                      (0, _lodash2.default)(function() {
                        _this2.changed = true;
                        _this2.emit('change');
                      }, 200)
                    );
                  }

                  this.env.on('filter', function() {
                    _this2.render();
                  });

                  _context.next = 4;
                  return this.run();

                case 4:
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

    function start() {
      return _ref.apply(this, arguments);
    }

    return start;
  })();

  Runner.prototype.run = (function() {
    var _ref2 = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  this.changed = false;
                  this.running = true;
                  _context2.next = 4;
                  return this.update();

                case 4:
                  this.running = false;

                  if (!this.env.watch) {
                    _context2.next = 10;
                    break;
                  }

                  _context2.next = 8;
                  return this.waitForNextChange();

                case 8:
                  _context2.next = 10;
                  return this.run();

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          },
          _callee2,
          this
        );
      })
    );

    function run() {
      return _ref2.apply(this, arguments);
    }

    return run;
  })();

  Runner.prototype.waitForNextChange = (function() {
    var _ref3 = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee3() {
        var _this3 = this;

        return _regenerator2.default.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  if (!this.changed) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt('return');

                case 2:
                  return _context3.abrupt(
                    'return',
                    new _promise2.default(function(resolve) {
                      _this3.once('change', resolve);
                    })
                  );

                case 3:
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

    function waitForNextChange() {
      return _ref3.apply(this, arguments);
    }

    return waitForNextChange;
  })();

  Runner.prototype.update = (function() {
    var _ref4 = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee4() {
        var results, errors, _iterator, _isArray, _i, _ref5, error, exit;

        return _regenerator2.default.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  this.env.logger.info(this.env.lang.get('gettingFlowStatus'), {
                    status: true
                  });

                  if (this.env.interface) {
                    this.env.interface.setOutput('');
                  }

                  _context4.next = 4;
                  return flow.status(this.env);

                case 4:
                  this.status = _context4.sent;
                  results = [];

                  if (!this.status.errors) {
                    _context4.next = 31;
                    break;
                  }

                  errors = this.status.errors;
                  (_iterator = errors),
                    (_isArray = Array.isArray(_iterator)),
                    (_i = 0),
                    (_iterator = _isArray
                      ? _iterator
                      : (0, _getIterator3.default)(_iterator));

                case 9:
                  if (!_isArray) {
                    _context4.next = 15;
                    break;
                  }

                  if (!(_i >= _iterator.length)) {
                    _context4.next = 12;
                    break;
                  }

                  return _context4.abrupt('break', 29);

                case 12:
                  _ref5 = _iterator[_i++];
                  _context4.next = 19;
                  break;

                case 15:
                  _i = _iterator.next();

                  if (!_i.done) {
                    _context4.next = 18;
                    break;
                  }

                  return _context4.abrupt('break', 29);

                case 18:
                  _ref5 = _i.value;

                case 19:
                  error = _ref5;
                  _context4.t0 = results;
                  _context4.t1 = error;
                  _context4.next = 24;
                  return this.env.printer.printError(error);

                case 24:
                  _context4.t2 = _context4.sent;
                  _context4.t3 = {
                    error: _context4.t1,
                    message: _context4.t2
                  };

                  _context4.t0.push.call(_context4.t0, _context4.t3);

                case 27:
                  _context4.next = 9;
                  break;

                case 29:
                  _context4.next = 32;
                  break;

                case 31:
                  if (this.status.exit) {
                    exit = this.status.exit;

                    results.push({
                      message: exit.msg
                    });
                  }

                case 32:
                  this._currentResults = results;
                  this.render();

                case 34:
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

    function update() {
      return _ref4.apply(this, arguments);
    }

    return update;
  })();

  Runner.prototype.render = function render() {
    var results = this._currentResults || [];
    var filters = this.env.filters.map(function(filter) {
      var negated = filter.indexOf('!') === 0;
      var value = negated ? filter.slice(1) : filter;
      return (negated ? '!' : '') + path.join('**', '*' + value + '*');
    });

    if (filters.length) {
      filters.unshift('**');
    }

    if (!results.length) {
      if (this.env.interface) {
        this.env.interface.setResults(results);
      }
      this.env.logger.success(this.env.lang.get('flowDidntFindAnyErrors'), {
        status: true
      });
      return;
    }

    var filteredResults = void 0;

    if (filters.length) {
      filteredResults = results.filter(function(result) {
        if (!result.error) {
          return true;
        }
        return result.error.message.find(function(messagePart) {
          if (messagePart.loc && messagePart.loc.source) {
            return (0, _multimatch2.default)(messagePart.loc.source, filters)
              .length;
          } else {
            return false;
          }
        });
      });
    } else {
      filteredResults = results;
    }

    var message = this.env.lang.get(
      results.length === 1 ? 'foundError' : 'foundErrors',
      results.length
    );

    if (filteredResults.length !== results.length) {
      message = this.env.lang.get(
        'foundErrorsWithFilters',
        message,
        filteredResults.length
      );
    }

    this.env.logger.success(message, { status: true });

    if (this.env.interface) {
      this.env.interface.setResults(filteredResults);
    } else {
      for (
        var _iterator2 = filteredResults,
          _isArray2 = Array.isArray(_iterator2),
          _i2 = 0,
          _iterator2 = _isArray2
            ? _iterator2
            : (0, _getIterator3.default)(_iterator2);
        ;

      ) {
        var _ref6;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref6 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref6 = _i2.value;
        }

        var result = _ref6;

        this.env.logger.line();
        this.env.logger.info(result.message, {
          prefix: false
        });
      }
      this.env.logger.line();
    }
  };

  return Runner;
})(_events2.default));
