'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

function startupError(messageKey, ...args) {
  const message = _Lang.Lang.get(messageKey, ...args);
  console.error(_chalk2.default.red.bold(message));
  process.exit(1);
  return new Error(message);
}

exports.default = async function glow(opts) {
  let cwd = opts.cwd;
  let start = timers.now();

  (0, _signalExit2.default)(() => {
    let end = timers.now();
    let seconds = timers.seconds(start, end);
    env.logger.info(env.lang.get('doneIn', seconds));
  });

  let flowConfigPath = await flow.getFlowConfigPath(cwd);

  if (!flowConfigPath) {
    throw startupError('noFlowConfig');
  }

  let flowRootDir = flow.getFlowRootDir(flowConfigPath);
  let flowConfig = await flow.getFlowConfig(flowRootDir);

  if (!flowConfig) {
    throw startupError(
      'noFlowBinary',
      flow.getPossibleFlowBinPaths(flowRootDir).join(', ')
    );
  }

  const env = new _Env.Env(
    (0, _extends3.default)({}, opts, {
      flowConfigPath,
      flowRootDir,
      flowBinPath: flowConfig.binary
    })
  );

  env.logger.title(
    env.lang.get('title', _constants.GLOW_VERSION, flowConfig.semver),
    {
      emoji: '🕵️‍♀️'
    }
  );

  let runner = new _Runner.Runner({ env });

  await runner.start();

  return runner.status;
};
