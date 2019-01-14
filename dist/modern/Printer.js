'use strict';

exports.__esModule = true;
exports.Printer = undefined;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

class Printer {
  constructor(opts) {
    this.env = opts.env;
  }

  indent(str, amount = 2) {
    let pad = ' '.repeat(amount);
    return str
      .split('\n')
      .map(line => pad + line)
      .join('\n');
  }

  async printError(error) {
    let res = [];

    for (let message of error.message) {
      res.push(await this._printMessagePart(message));
    }

    if (error.extra) {
      for (let message of error.extra) {
        res.push(await this._printExtra(message));
      }
    }

    return res.join('\n\n');
  }

  async _printExtra(message) {
    let res = [];

    for (let messagePart of message.message) {
      res.push(
        await this._printMessagePart(messagePart, {
          linesAbove: 1,
          linesBelow: 1
        })
      );
    }

    if (message.children) {
      for (let child of message.children) {
        res.push(await this._printExtra(child));
      }
    }

    return this.indent(res.join('\n\n'), 4);
  }

  async _printMessagePart(messagePart, opts = {}) {
    if (messagePart.type === 'Blame' && messagePart.context !== null) {
      return await this._printBlameMessagePart(messagePart, opts);
    } else if (
      messagePart.type === 'Comment' ||
      (messagePart.type === 'Blame' && messagePart.context === null)
    ) {
      return await this._printCommentMessagePart(messagePart);
    } else {
      this.env.logger.warn(
        `messagePart.type = ${String(messagePart.type)} isn't implemented`
      );
    }
  }

  async _printBlameMessagePart(messagePart, opts = {}) {
    return await this._printLocation(
      messagePart.loc,
      (0, _extends3.default)(
        {
          message: messagePart.descr
        },
        opts
      )
    );
  }

  async _printCommentMessagePart(messagePart) {
    return _chalk2.default.red.bold(messagePart.descr);
  }

  async _printLocation(loc, opts = {}) {
    if (loc.type === 'SourceFile' || loc.type === 'LibFile') {
      return await this._printFileLocation(loc, opts);
    } else {
      this.env.logger.warn(`loc.type = ${String(loc.type)} isn't implemented`);
    }
  }

  async _printFileLocation(loc, opts = {}) {
    let link = _chalk2.default.dim.underline(`${loc.source}:${loc.start.line}`);
    let fileContents = await (0, _fs.readFileWithCache)(
      new _map2.default(),
      loc.source
    );
    let babelLoc = (0, _locations.toBabelSourceLocation)(loc);
    let codeFrame = (0, _codeFrame.codeFrameColumns)(
      fileContents,
      babelLoc,
      (0, _extends3.default)(
        {
          highlightCode: true
        },
        opts
      )
    );
    return `${link}\n${codeFrame}`;
  }
}
exports.Printer = Printer;
