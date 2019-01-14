'use strict';

exports.__esModule = true;
exports.Env = undefined;

require('./types');

var _Logger = require('./Logger');

var _Printer = require('./Printer');

var _Interface = require('./Interface');

var _constants = require('./constants');

var _Lang = require('./Lang');

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

class Env extends _events2.default {
  constructor(opts) {
    super();

    this.cwd = opts.cwd;
    this.filters = opts.filters || [];
    this.watch = opts.watch || false;
    this.interactive = opts.interactive || this.watch;
    this.beep = !!opts.beep;
    this.logLevel = opts.debug
      ? _constants.LOG_LEVELS.debug
      : opts.quiet ? _constants.LOG_LEVELS.error : _constants.LOG_LEVELS.info;

    this.flowConfigPath = opts.flowConfigPath;
    this.flowRootDir = opts.flowRootDir;
    this.flowBinPath = opts.flowBinPath;

    this.lang = new _Lang.Lang('en');
    this.logger = new _Logger.Logger({ env: this });
    this.printer = new _Printer.Printer({ env: this });

    if (this.interactive) {
      this.interface = new _Interface.Interface({ env: this });
      this.interface.on('close', () => {
        process.exit(0);
      });
    } else {
      this.interface = null;
    }
  }

  setFilters(filters) {
    this.filters = filters;
    this.emit('filter', this.filters);
  }
}
exports.Env = Env;
