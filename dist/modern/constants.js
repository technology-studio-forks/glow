'use strict';

exports.__esModule = true;
exports.LOG_LEVELS = exports.STDOUT_HEIGHT = exports.STDOUT_WIDTH = exports.GLOW_VERSION = exports.GLOW_PKG_JSON = undefined;

var _readPkgUp = require('read-pkg-up');

var _readPkgUp2 = _interopRequireDefault(_readPkgUp);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const GLOW_PKG_JSON = (exports.GLOW_PKG_JSON = _readPkgUp2.default.sync({
  cwd: __dirname,
  normalize: false
}).pkg);
const GLOW_VERSION = (exports.GLOW_VERSION = GLOW_PKG_JSON.version);

const STDOUT_WIDTH = (exports.STDOUT_WIDTH =
  process.stdout && typeof process.stdout.columns === 'number'
    ? process.stdout.columns
    : 80);

const STDOUT_HEIGHT = (exports.STDOUT_HEIGHT =
  process.stdout && typeof process.stdout.rows === 'number'
    ? process.stdout.rows
    : 100);

const LOG_LEVELS = (exports.LOG_LEVELS = {
  output: 0,
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
});
