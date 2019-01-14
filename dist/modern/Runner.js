'use strict';

exports.__esModule = true;
exports.Runner = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _Env = require('./Env');

var _Interface = require('./Interface');

var _flow = require('./utils/flow');

var flow = _interopRequireWildcard(_flow);

var _fs = require('./utils/fs');

var fs = _interopRequireWildcard(_fs);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

require('./types');

var _multimatch = require('multimatch');

var _multimatch2 = _interopRequireDefault(_multimatch);

var _path = require('path');

var path = _interopRequireWildcard(_path);

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

class Runner extends _events2.default {
  constructor(opts) {
    super();
    this.env = opts.env;
    this.running = false;
    this.changed = false;
  }

  async start() {
    if (this.env.watch) {
      let watcher = fs.watchDirectory(this.env.flowRootDir);
      watcher.on(
        'change',
        (0, _lodash2.default)(() => {
          this.changed = true;
          this.emit('change');
        }, 200)
      );
    }

    this.env.on('filter', () => {
      this.render();
    });

    await this.run();
  }

  async run() {
    this.changed = false;
    this.running = true;
    await this.update();
    this.running = false;
    if (this.env.watch) {
      await this.waitForNextChange();
      await this.run();
    }
  }

  async waitForNextChange() {
    if (this.changed) return;
    return new _promise2.default(resolve => {
      this.once('change', resolve);
    });
  }

  async update() {
    this.env.logger.info(this.env.lang.get('gettingFlowStatus'), {
      status: true
    });

    if (this.env.interface) {
      this.env.interface.setOutput('');
    }

    this.status = await flow.status(this.env);
    let results = [];
    if (this.status.errors) {
      let errors = this.status.errors;
      for (let error of errors) {
        results.push({
          error,
          message: await this.env.printer.printError(error)
        });
      }
    } else if (this.status.exit) {
      let exit = this.status.exit;
      results.push({
        message: exit.msg
      });
    }

    this._currentResults = results;
    this.render();
  }

  render() {
    let results = this._currentResults || [];
    let filters = this.env.filters.map(filter => {
      let negated = filter.indexOf('!') === 0;
      let value = negated ? filter.slice(1) : filter;
      return (negated ? '!' : '') + path.join('**', '*' + value + '*');
    });

    if (filters.length) {
      filters.unshift('**');
    }

    if (!results.length) {
      if (this.env.interface) {
        this.env.interface.setResults(results);
      }
      this.env.logger.success(this.env.lang.get('flowDidntFindAnyErrors'), {
        status: true
      });
      return;
    }

    let filteredResults;

    if (filters.length) {
      filteredResults = results.filter(result => {
        if (!result.error) {
          return true;
        }
        return result.error.message.find(messagePart => {
          if (messagePart.loc && messagePart.loc.source) {
            return (0, _multimatch2.default)(messagePart.loc.source, filters)
              .length;
          } else {
            return false;
          }
        });
      });
    } else {
      filteredResults = results;
    }

    let message = this.env.lang.get(
      results.length === 1 ? 'foundError' : 'foundErrors',
      results.length
    );

    if (filteredResults.length !== results.length) {
      message = this.env.lang.get(
        'foundErrorsWithFilters',
        message,
        filteredResults.length
      );
    }

    this.env.logger.success(message, { status: true });

    if (this.env.interface) {
      this.env.interface.setResults(filteredResults);
    } else {
      for (let result of filteredResults) {
        this.env.logger.line();
        this.env.logger.info(result.message, {
          prefix: false
        });
      }
      this.env.logger.line();
    }
  }
}
exports.Runner = Runner;
