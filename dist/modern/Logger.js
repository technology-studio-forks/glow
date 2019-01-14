'use strict';

exports.__esModule = true;
exports.Logger = undefined;

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

class Logger {
  constructor(opts) {
    this.env = opts.env;
  }

  write(stream, kind, message, opts = {}) {
    let logLevel = _constants.LOG_LEVELS[kind];
    let str = message;

    if (logLevel > this.env.logLevel) {
      return;
    }

    let prefix = opts.prefix ? `${opts.prefix} ` : '';
    let fullPrefix =
      opts.emoji && !this.env.interface ? `${opts.emoji}  ${prefix}` : prefix;

    str = opts.style ? opts.style(str) : str;
    str =
      fullPrefix == ''
        ? str
        : str
            .split('\n')
            .map(line => `${fullPrefix}${line}`)
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
  }

  title(message, opts = {}) {
    this.write(
      'stderr',
      'info',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        style: _chalk2.default.bold.magenta,
        title: true
      })
    );
  }

  info(message, opts = {}) {
    this.write(
      'stderr',
      'info',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        prefix: _chalk2.default.cyan('info')
      })
    );
  }

  success(message, opts = {}) {
    this.write(
      'stderr',
      'info',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        prefix: _chalk2.default.green('success')
      })
    );
  }

  debug(message, opts = {}) {
    this.write(
      'stderr',
      'debug',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        prefix: _chalk2.default.magenta('debug')
      })
    );
  }

  warn(message, opts = {}) {
    this.write(
      'stderr',
      'warn',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        prefix: _chalk2.default.yellow('warn')
      })
    );
  }

  error(message, opts = {}) {
    this.write(
      'stderr',
      'error',
      (0, _Lang.langMessageToString)(message),
      toFormatOptions(opts, {
        prefix: _chalk2.default.yellow('red')
      })
    );
  }

  line() {
    this.write(
      'stderr',
      'output',
      '\n' + _chalk2.default.gray('─'.repeat(_constants.STDOUT_WIDTH)) + '\n'
    );
  }
}
exports.Logger = Logger;
