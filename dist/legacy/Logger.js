'use strict';

exports.__esModule = true;
exports.Logger = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Env = require('./Env');

var _Lang = require('./Lang');

var _constants = require('./constants');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function toFormatOptions(logOptions, formatOptions) {
  return {
    emoji: logOptions.emoji || formatOptions.emoji,
    prefix: logOptions.prefix !== false ? formatOptions.prefix : null,
    style: formatOptions.style,
    title: logOptions.title || formatOptions.title,
    status: logOptions.status || formatOptions.status
  };
}

var Logger = (exports.Logger = (function() {
  function Logger(opts) {
    (0, _classCallCheck3.default)(this, Logger);

    this.env = opts.env;
  }

  Logger.prototype.write = function write(stream, kind, message) {
    var opts =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var logLevel = _constants.LOG_LEVELS[kind];
    var str = message;

    if (logLevel > this.env.logLevel) {
      return;
    }

    var prefix = opts.prefix ? `${opts.prefix} ` : '';
    var fullPrefix =
      opts.emoji && !this.env.interface ? `${opts.emoji}  ${prefix}` : prefix;

    str = opts.style ? opts.style(str) : str;
    str =
      fullPrefix == ''
        ? str
        : str
            .split('\n')
            .map(function(line) {
              return `${fullPrefix}${line}`;
            })
            .join('\n');

    if (this.env.interface) {
      if (opts.title) {
        this.env.interface.setTitle(str);
      } else if (opts.status) {
        this.env.interface.setStatus(str);
      } else {
        // this.env.interface.writeLog(str);
      }
    } else {
      if (stream === 'stdout') {
        console.log(str);
      } else {
        console.error(str);
      }
    }
  };

  Logger.prototype.title = function title(message) {
    var opts =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.write(
      'stderr',
      'info',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        style: _chalk2.default.bold.magenta,
        title: true
      })
    );
  };

  Logger.prototype.info = function info(message) {
    var opts =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.write(
      'stderr',
      'info',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        prefix: _chalk2.default.cyan('info')
      })
    );
  };

  Logger.prototype.success = function success(message) {
    var opts =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.write(
      'stderr',
      'info',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        prefix: _chalk2.default.green('success')
      })
    );
  };

  Logger.prototype.debug = function debug(message) {
    var opts =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.write(
      'stderr',
      'debug',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        prefix: _chalk2.default.magenta('debug')
      })
    );
  };

  Logger.prototype.warn = function warn(message) {
    var opts =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.write(
      'stderr',
      'warn',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        prefix: _chalk2.default.yellow('warn')
      })
    );
  };

  Logger.prototype.error = function error(message) {
    var opts =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.write(
      'stderr',
      'error',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        prefix: _chalk2.default.yellow('red')
      })
    );
  };

  Logger.prototype.line = function line() {
    this.write(
      'stderr',
      'output',
      '\n' + _chalk2.default.gray('─'.repeat(_constants.STDOUT_WIDTH)) + '\n'
    );
  };

  return Logger;
})());
