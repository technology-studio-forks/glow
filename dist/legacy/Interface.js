'use strict';

exports.__esModule = true;
exports.Interface = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(
  _possibleConstructorReturn2
);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _Env = require('./Env');

require('./types');

var _constants = require('./constants');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _beeper = require('beeper');

var _beeper2 = _interopRequireDefault(_beeper);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Interface = (exports.Interface = (function(_EventEmitter) {
  (0, _inherits3.default)(Interface, _EventEmitter);

  function Interface(opts) {
    (0, _classCallCheck3.default)(this, Interface);

    var _this = (0, _possibleConstructorReturn3.default)(
      this,
      _EventEmitter.call(this)
    );

    _this.env = opts.env;
    _this._results = [];
    _this._currentIndex = 0;

    _this.screen = _blessed2.default.screen({
      smartCSR: true,
      doubleWidth: true
    });

    _this.title = _blessed2.default.box({
      top: 0,
      left: 0,
      height: 1,
      width: '100%',
      style: {
        bold: true
      }
    });

    _this.status = _blessed2.default.box({
      top: 1,
      left: 0,
      height: 1,
      width: '100%',
      content: '(idle)'
    });

    _this.topLine = _blessed2.default.line({
      orientation: 'horizontal',
      top: 2,
      left: 0,
      height: 1,
      width: '100%'
    });

    _this.output = _blessed2.default.box({
      top: 3,
      left: 0,
      width: '100%',
      height: '100%-5',
      input: true,
      mouse: true,
      scrollable: true,
      alwaysScroll: true,
      scrollbar: {
        bg: 'white',
        fg: 'blue'
      }
    });

    _this.bottomLine = _blessed2.default.line({
      orientation: 'horizontal',
      bottom: 1,
      left: 0,
      height: 1,
      width: '100%'
    });

    _this.filters = _blessed2.default.box({
      bottom: 0,
      left: 0,
      width: '100%',
      height: 1
    });

    _this.screen.append(_this.title);
    _this.screen.append(_this.status);
    _this.screen.append(_this.topLine);
    _this.screen.append(_this.output);
    _this.screen.append(_this.bottomLine);
    _this.screen.append(_this.filters);

    _this.screen.key(['escape', 'C-c'], function() {
      _this.emit('close');
    });

    _this.screen.on('keypress', function(char, meta) {
      var filters = _this._filters;

      if (
        meta.name === 'enter' ||
        meta.name === 'return' ||
        meta.ctrl === true
      ) {
        return;
      } else if (meta.name === 'left' || meta.name === 'up') {
        _this._prevResult();
        return;
      } else if (meta.name === 'right' || meta.name === 'down') {
        _this._nextResult();
        return;
      } else if (meta.name === 'backspace') {
        filters = filters.slice(0, -1);
      } else if (meta.name === 'delete') {
        filters = '';
      } else if (char) {
        filters = filters + char;
      }

      _this.setFilters(filters);

      filters = filters.split(/, */);
      filters = filters.filter(function(filter) {
        return filter !== '';
      });

      _this.env.setFilters(filters);
    });

    _this.screen.render();
    _this.setFilters(_this.env.filters.join(', '));
    return _this;
  }

  Interface.prototype.setOutput = function setOutput(output) {
    this.output.setContent(output);
    this.screen.render();
  };

  Interface.prototype.setTitle = function setTitle(title) {
    this.title.setContent(title);
    this.screen.render();
  };

  Interface.prototype.setStatus = function setStatus(status) {
    this.status.setContent(status);
    this.screen.render();
  };

  Interface.prototype.setFilters = function setFilters(filters) {
    this._filters = filters;
    var value = this._filters !== '' ? this._filters : '(none)';
    this.filters.setContent(`Filters: ${value}`);
    this.screen.render();
  };

  Interface.prototype.setResults = function setResults(results) {
    var prevResults = this._results;

    this._results = results;
    this._setCurrentIndex(0);

    var prevHadErrors = prevResults.length !== 0;
    var currHasErrors = results.length !== 0;

    if (prevHadErrors !== currHasErrors) {
      this.beep();
    }
  };

  Interface.prototype._nextResult = function _nextResult() {
    var nextIndex = this._currentIndex + 1;
    if (nextIndex < this._results.length) {
      this._setCurrentIndex(nextIndex);
    } else {
      this.beep();
    }
  };

  Interface.prototype._prevResult = function _prevResult() {
    var prevIndex = this._currentIndex - 1;
    if (prevIndex >= 0) {
      this._setCurrentIndex(prevIndex);
    } else {
      this.beep();
    }
  };

  Interface.prototype._setCurrentIndex = function _setCurrentIndex(index) {
    var _this2 = this;

    this._currentIndex = index;

    if (!this._results.length) {
      this.setOutput('');
      return;
    }

    var startPad = 10;
    var sectionPad = 4;
    var startPadding = ' '.repeat(startPad);
    var sectionPadding = '\n'.repeat(sectionPad);

    var sections = this._results
      .map(function(result, index) {
        return result.message
          .split('\n')
          .map(function(str) {
            if (_this2._currentIndex === index) {
              return startPadding + str;
            } else {
              return (
                startPadding +
                _chalk2.default.gray((0, _stripAnsi2.default)(str))
              );
            }
          })
          .join('\n');
      })
      .map(function(str) {
        return sectionPadding + str;
      });

    var lastSectionHeight =
      sections[sections.length - 1].split('\n').length - 1;

    var topPad = 4;
    var bottomPad = Math.max(
      _constants.STDOUT_HEIGHT - lastSectionHeight - topPad,
      topPad
    );
    var scrollPosition = topPad;

    sections.find(function(section, index) {
      var isCurrent = index === _this2._currentIndex;
      if (!isCurrent) scrollPosition += section.split('\n').length - 1;
      return isCurrent;
    });

    scrollPosition = Math.max(scrollPosition - topPad, 0);

    var output =
      '\n'.repeat(topPad - sectionPad) +
      sections.join('') +
      '\n'.repeat(bottomPad);

    this.output.resetScroll();
    this.setOutput(output);
    this.output.scrollTo(scrollPosition);
    this.output.setScroll(scrollPosition);
    this.screen.render();
  };

  Interface.prototype.beep = function beep() {
    if (this.env.beep) {
      (0, _beeper2.default)();
    }
  };

  return Interface;
})(_events2.default));
