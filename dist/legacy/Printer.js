'use strict';

exports.__esModule = true;
exports.Printer = undefined;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Env = require('./Env');

require('./types');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _locations = require('./utils/locations');

var _codeFrame = require('@babel/code-frame');

var _fs = require('./utils/fs');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Printer = (exports.Printer = (function() {
  function Printer(opts) {
    (0, _classCallCheck3.default)(this, Printer);

    this.env = opts.env;
  }

  Printer.prototype.indent = function indent(str) {
    var amount =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var pad = ' '.repeat(amount);
    return str
      .split('\n')
      .map(function(line) {
        return pad + line;
      })
      .join('\n');
  };

  Printer.prototype.printError = (function() {
    var _ref = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee(error) {
        var res,
          _iterator,
          _isArray,
          _i,
          _ref2,
          message,
          _iterator2,
          _isArray2,
          _i2,
          _ref3,
          _message;

        return _regenerator2.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  res = [];
                  (_iterator = error.message),
                    (_isArray = Array.isArray(_iterator)),
                    (_i = 0),
                    (_iterator = _isArray
                      ? _iterator
                      : (0, _getIterator3.default)(_iterator));

                case 2:
                  if (!_isArray) {
                    _context.next = 8;
                    break;
                  }

                  if (!(_i >= _iterator.length)) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt('break', 20);

                case 5:
                  _ref2 = _iterator[_i++];
                  _context.next = 12;
                  break;

                case 8:
                  _i = _iterator.next();

                  if (!_i.done) {
                    _context.next = 11;
                    break;
                  }

                  return _context.abrupt('break', 20);

                case 11:
                  _ref2 = _i.value;

                case 12:
                  message = _ref2;
                  _context.t0 = res;
                  _context.next = 16;
                  return this._printMessagePart(message);

                case 16:
                  _context.t1 = _context.sent;

                  _context.t0.push.call(_context.t0, _context.t1);

                case 18:
                  _context.next = 2;
                  break;

                case 20:
                  if (!error.extra) {
                    _context.next = 40;
                    break;
                  }

                  (_iterator2 = error.extra),
                    (_isArray2 = Array.isArray(_iterator2)),
                    (_i2 = 0),
                    (_iterator2 = _isArray2
                      ? _iterator2
                      : (0, _getIterator3.default)(_iterator2));

                case 22:
                  if (!_isArray2) {
                    _context.next = 28;
                    break;
                  }

                  if (!(_i2 >= _iterator2.length)) {
                    _context.next = 25;
                    break;
                  }

                  return _context.abrupt('break', 40);

                case 25:
                  _ref3 = _iterator2[_i2++];
                  _context.next = 32;
                  break;

                case 28:
                  _i2 = _iterator2.next();

                  if (!_i2.done) {
                    _context.next = 31;
                    break;
                  }

                  return _context.abrupt('break', 40);

                case 31:
                  _ref3 = _i2.value;

                case 32:
                  _message = _ref3;
                  _context.t2 = res;
                  _context.next = 36;
                  return this._printExtra(_message);

                case 36:
                  _context.t3 = _context.sent;

                  _context.t2.push.call(_context.t2, _context.t3);

                case 38:
                  _context.next = 22;
                  break;

                case 40:
                  return _context.abrupt('return', res.join('\n\n'));

                case 41:
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

    function printError(_x2) {
      return _ref.apply(this, arguments);
    }

    return printError;
  })();

  Printer.prototype._printExtra = (function() {
    var _ref4 = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee2(message) {
        var res,
          _iterator3,
          _isArray3,
          _i3,
          _ref5,
          messagePart,
          _iterator4,
          _isArray4,
          _i4,
          _ref6,
          child;

        return _regenerator2.default.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  res = [];
                  (_iterator3 = message.message),
                    (_isArray3 = Array.isArray(_iterator3)),
                    (_i3 = 0),
                    (_iterator3 = _isArray3
                      ? _iterator3
                      : (0, _getIterator3.default)(_iterator3));

                case 2:
                  if (!_isArray3) {
                    _context2.next = 8;
                    break;
                  }

                  if (!(_i3 >= _iterator3.length)) {
                    _context2.next = 5;
                    break;
                  }

                  return _context2.abrupt('break', 20);

                case 5:
                  _ref5 = _iterator3[_i3++];
                  _context2.next = 12;
                  break;

                case 8:
                  _i3 = _iterator3.next();

                  if (!_i3.done) {
                    _context2.next = 11;
                    break;
                  }

                  return _context2.abrupt('break', 20);

                case 11:
                  _ref5 = _i3.value;

                case 12:
                  messagePart = _ref5;
                  _context2.t0 = res;
                  _context2.next = 16;
                  return this._printMessagePart(messagePart, {
                    linesAbove: 1,
                    linesBelow: 1
                  });

                case 16:
                  _context2.t1 = _context2.sent;

                  _context2.t0.push.call(_context2.t0, _context2.t1);

                case 18:
                  _context2.next = 2;
                  break;

                case 20:
                  if (!message.children) {
                    _context2.next = 40;
                    break;
                  }

                  (_iterator4 = message.children),
                    (_isArray4 = Array.isArray(_iterator4)),
                    (_i4 = 0),
                    (_iterator4 = _isArray4
                      ? _iterator4
                      : (0, _getIterator3.default)(_iterator4));

                case 22:
                  if (!_isArray4) {
                    _context2.next = 28;
                    break;
                  }

                  if (!(_i4 >= _iterator4.length)) {
                    _context2.next = 25;
                    break;
                  }

                  return _context2.abrupt('break', 40);

                case 25:
                  _ref6 = _iterator4[_i4++];
                  _context2.next = 32;
                  break;

                case 28:
                  _i4 = _iterator4.next();

                  if (!_i4.done) {
                    _context2.next = 31;
                    break;
                  }

                  return _context2.abrupt('break', 40);

                case 31:
                  _ref6 = _i4.value;

                case 32:
                  child = _ref6;
                  _context2.t2 = res;
                  _context2.next = 36;
                  return this._printExtra(child);

                case 36:
                  _context2.t3 = _context2.sent;

                  _context2.t2.push.call(_context2.t2, _context2.t3);

                case 38:
                  _context2.next = 22;
                  break;

                case 40:
                  return _context2.abrupt(
                    'return',
                    this.indent(res.join('\n\n'), 4)
                  );

                case 41:
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

    function _printExtra(_x3) {
      return _ref4.apply(this, arguments);
    }

    return _printExtra;
  })();

  Printer.prototype._printMessagePart = (function() {
    var _ref7 = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee3(messagePart) {
        var opts =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        return _regenerator2.default.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  if (
                    !(
                      messagePart.type === 'Blame' &&
                      messagePart.context !== null
                    )
                  ) {
                    _context3.next = 6;
                    break;
                  }

                  _context3.next = 3;
                  return this._printBlameMessagePart(messagePart, opts);

                case 3:
                  return _context3.abrupt('return', _context3.sent);

                case 6:
                  if (
                    !(
                      messagePart.type === 'Comment' ||
                      (messagePart.type === 'Blame' &&
                        messagePart.context === null)
                    )
                  ) {
                    _context3.next = 12;
                    break;
                  }

                  _context3.next = 9;
                  return this._printCommentMessagePart(messagePart);

                case 9:
                  return _context3.abrupt('return', _context3.sent);

                case 12:
                  this.env.logger.warn(
                    `messagePart.type = ${String(
                      messagePart.type
                    )} isn't implemented`
                  );

                case 13:
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

    function _printMessagePart(_x5) {
      return _ref7.apply(this, arguments);
    }

    return _printMessagePart;
  })();

  Printer.prototype._printBlameMessagePart = (function() {
    var _ref8 = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee4(messagePart) {
        var opts =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        return _regenerator2.default.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2;
                  return this._printLocation(
                    messagePart.loc,
                    (0, _extends3.default)(
                      {
                        message: messagePart.descr
                      },
                      opts
                    )
                  );

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

    function _printBlameMessagePart(_x7) {
      return _ref8.apply(this, arguments);
    }

    return _printBlameMessagePart;
  })();

  Printer.prototype._printCommentMessagePart = (function() {
    var _ref9 = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee5(messagePart) {
        return _regenerator2.default.wrap(
          function _callee5$(_context5) {
            while (1) {
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  return _context5.abrupt(
                    'return',
                    _chalk2.default.red.bold(messagePart.descr)
                  );

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          },
          _callee5,
          this
        );
      })
    );

    function _printCommentMessagePart(_x8) {
      return _ref9.apply(this, arguments);
    }

    return _printCommentMessagePart;
  })();

  Printer.prototype._printLocation = (function() {
    var _ref10 = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee6(loc) {
        var opts =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        return _regenerator2.default.wrap(
          function _callee6$(_context6) {
            while (1) {
              switch ((_context6.prev = _context6.next)) {
                case 0:
                  if (!(loc.type === 'SourceFile' || loc.type === 'LibFile')) {
                    _context6.next = 6;
                    break;
                  }

                  _context6.next = 3;
                  return this._printFileLocation(loc, opts);

                case 3:
                  return _context6.abrupt('return', _context6.sent);

                case 6:
                  this.env.logger.warn(
                    `loc.type = ${String(loc.type)} isn't implemented`
                  );

                case 7:
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

    function _printLocation(_x10) {
      return _ref10.apply(this, arguments);
    }

    return _printLocation;
  })();

  Printer.prototype._printFileLocation = (function() {
    var _ref11 = (0, _asyncToGenerator3.default)(
      /*#__PURE__*/ _regenerator2.default.mark(function _callee7(loc) {
        var opts =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        var link, fileContents, babelLoc, codeFrame;
        return _regenerator2.default.wrap(
          function _callee7$(_context7) {
            while (1) {
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  link = _chalk2.default.dim.underline(
                    `${loc.source}:${loc.start.line}`
                  );
                  _context7.next = 3;
                  return (0, _fs.readFileWithCache)(
                    new _map2.default(),
                    loc.source
                  );

                case 3:
                  fileContents = _context7.sent;
                  babelLoc = (0, _locations.toBabelSourceLocation)(loc);
                  codeFrame = (0, _codeFrame.codeFrameColumns)(
                    fileContents,
                    babelLoc,
                    (0, _extends3.default)(
                      {
                        highlightCode: true
                      },
                      opts
                    )
                  );
                  return _context7.abrupt('return', `${link}\n${codeFrame}`);

                case 7:
                case 'end':
                  return _context7.stop();
              }
            }
          },
          _callee7,
          this
        );
      })
    );

    function _printFileLocation(_x12) {
      return _ref11.apply(this, arguments);
    }

    return _printFileLocation;
  })();

  return Printer;
})());
