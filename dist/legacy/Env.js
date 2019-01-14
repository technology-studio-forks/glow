'use strict';

exports.__esModule = true;
exports.Env = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(
  _possibleConstructorReturn2
);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var Env = (exports.Env = (function(_EventEmitter) {
  (0, _inherits3.default)(Env, _EventEmitter);

  function Env(opts) {
    (0, _classCallCheck3.default)(this, Env);

    var _this = (0, _possibleConstructorReturn3.default)(
      this,
      _EventEmitter.call(this)
    );

    _this.cwd = opts.cwd;
    _this.filters = opts.filters || [];
    _this.watch = opts.watch || false;
    _this.interactive = opts.interactive || _this.watch;
    _this.beep = !!opts.beep;
    _this.logLevel = opts.debug
      ? _constants.LOG_LEVELS.debug
      : opts.quiet ? _constants.LOG_LEVELS.error : _constants.LOG_LEVELS.info;

    _this.flowConfigPath = opts.flowConfigPath;
    _this.flowRootDir = opts.flowRootDir;
    _this.flowBinPath = opts.flowBinPath;

    _this.lang = new _Lang.Lang('en');
    _this.logger = new _Logger.Logger({ env: _this });
    _this.printer = new _Printer.Printer({ env: _this });

    if (_this.interactive) {
      _this.interface = new _Interface.Interface({ env: _this });
      _this.interface.on('close', function() {
        process.exit(0);
      });
    } else {
      _this.interface = null;
    }
    return _this;
  }

  Env.prototype.setFilters = function setFilters(filters) {
    this.filters = filters;
    this.emit('filter', this.filters);
  };

  return Env;
})(_events2.default));
