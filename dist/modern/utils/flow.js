'use strict';

exports.__esModule = true;
exports.getFlowConfigPath = getFlowConfigPath;
exports.getFlowRootDir = getFlowRootDir;
exports.getPossibleFlowBinPaths = getPossibleFlowBinPaths;
exports.getFlowConfig = getFlowConfig;
exports.status = status;

var _spawndamnit = require('spawndamnit');

var _spawndamnit2 = _interopRequireDefault(_spawndamnit);

var _Env = require('../Env');

var _findUp = require('find-up');

var _findUp2 = _interopRequireDefault(_findUp);

var _path = require('path');

var path = _interopRequireWildcard(_path);

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

async function flow(path, cwd, args) {
  return await (0, _spawndamnit2.default)(path, args, { cwd });
}

async function getStdout(path, rootDir, args) {
  let stdout;
  try {
    let res = await flow(path, rootDir, args);
    stdout = res.stdout;
  } catch (err) {
    if (err instanceof _spawndamnit2.default.ChildProcessError) {
      stdout = err.stdout;
    } else {
      throw err;
    }
  }
  return stdout.toString();
}

async function getJSON(path, rootDir, args) {
  let stdout = await getStdout(path, rootDir, [...args, '--json']);
  return JSON.parse(stdout);
}

async function getFlowConfigPath(cwd) {
  return await (0, _findUp2.default)('.flowconfig', { cwd });
}

function getFlowRootDir(flowConfigPath) {
  return path.dirname(flowConfigPath);
}

function getPossibleFlowBinPaths(flowRootDir) {
  return [path.join(flowRootDir, 'node_modules', '.bin', 'flow'), 'flow'];
}

async function getFlowConfig(flowRootDir) {
  for (const path of getPossibleFlowBinPaths(flowRootDir)) {
    try {
      return await getJSON(path, flowRootDir, ['version']);
    } catch (e) {}
  }
  return null;
}

async function status(env) {
  return await getJSON(env.flowBinPath, env.flowRootDir, ['status']);
}
