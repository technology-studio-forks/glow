'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('./types');

var _Env = require('./Env');

var _Runner = require('./Runner');

var _flow = require('./utils/flow');

var flow = _interopRequireWildcard(_flow);

var _timers = require('./utils/timers');

var timers = _interopRequireWildcard(_timers);

var _constants = require('./constants');

var _signalExit = require('signal-exit');

var _signalExit2 = _interopRequireDefault(_signalExit);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _Lang = require('./Lang');

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

function startupError(messageKey) {
  for (
    var _len = arguments.length,
      args = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key];
  }

  var message = _Lang.Lang.get.apply(_Lang.Lang, [messageKey].concat(args));
  console.error(_chalk2.default.red.bold(message));
  process.exit(1);
  return new Error(message);
}

exports.default = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee(opts) {
      var cwd, start, flowConfigPath, flowRootDir, flowConfig, env, runner;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd;
                start = timers.now();

                (0, _signalExit2.default)(function() {
                  var end = timers.now();
                  var seconds = timers.seconds(start, end);
                  env.logger.info(env.lang.get('doneIn', seconds));
                });

                _context.next = 5;
                return flow.getFlowConfigPath(cwd);

              case 5:
                flowConfigPath = _context.sent;

                if (flowConfigPath) {
                  _context.next = 8;
                  break;
                }

                throw startupError('noFlowConfig');

              case 8:
                flowRootDir = flow.getFlowRootDir(flowConfigPath);
                _context.next = 11;
                return flow.getFlowConfig(flowRootDir);

              case 11:
                flowConfig = _context.sent;

                if (flowConfig) {
                  _context.next = 14;
                  break;
                }

                throw startupError(
                  'noFlowBinary',
                  flow.getPossibleFlowBinPaths(flowRootDir).join(', ')
                );

              case 14:
                env = new _Env.Env(
                  (0, _extends3.default)({}, opts, {
                    flowConfigPath,
                    flowRootDir,
                    flowBinPath: flowConfig.binary
                  })
                );

                env.logger.title(
                  env.lang.get(
                    'title',
                    _constants.GLOW_VERSION,
                    flowConfig.semver
                  ),
                  {
                    emoji: '🕵️‍♀️'
                  }
                );

                runner = new _Runner.Runner({ env });
                _context.next = 19;
                return runner.start();

              case 19:
                return _context.abrupt('return', runner.status);

              case 20:
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

  function glow(_x) {
    return _ref.apply(this, arguments);
  }

  return glow;
})();
