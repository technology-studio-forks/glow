'use strict';

exports.__esModule = true;
exports.Interface = undefined;

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

class Interface extends _events2.default {
  constructor(opts) {
    super();

    this.env = opts.env;
    this._results = [];
    this._currentIndex = 0;

    this.screen = _blessed2.default.screen({
      smartCSR: true,
      doubleWidth: true
    });

    this.title = _blessed2.default.box({
      top: 0,
      left: 0,
      height: 1,
      width: '100%',
      style: {
        bold: true
      }
    });

    this.status = _blessed2.default.box({
      top: 1,
      left: 0,
      height: 1,
      width: '100%',
      content: '(idle)'
    });

    this.topLine = _blessed2.default.line({
      orientation: 'horizontal',
      top: 2,
      left: 0,
      height: 1,
      width: '100%'
    });

    this.output = _blessed2.default.box({
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

    this.bottomLine = _blessed2.default.line({
      orientation: 'horizontal',
      bottom: 1,
      left: 0,
      height: 1,
      width: '100%'
    });

    this.filters = _blessed2.default.box({
      bottom: 0,
      left: 0,
      width: '100%',
      height: 1
    });

    this.screen.append(this.title);
    this.screen.append(this.status);
    this.screen.append(this.topLine);
    this.screen.append(this.output);
    this.screen.append(this.bottomLine);
    this.screen.append(this.filters);

    this.screen.key(['escape', 'C-c'], () => {
      this.emit('close');
    });

    this.screen.on('keypress', (char, meta) => {
      let filters = this._filters;

      if (
        meta.name === 'enter' ||
        meta.name === 'return' ||
        meta.ctrl === true
      ) {
        return;
      } else if (meta.name === 'left' || meta.name === 'up') {
        this._prevResult();
        return;
      } else if (meta.name === 'right' || meta.name === 'down') {
        this._nextResult();
        return;
      } else if (meta.name === 'backspace') {
        filters = filters.slice(0, -1);
      } else if (meta.name === 'delete') {
        filters = '';
      } else if (char) {
        filters = filters + char;
      }

      this.setFilters(filters);

      filters = filters.split(/, */);
      filters = filters.filter(filter => filter !== '');

      this.env.setFilters(filters);
    });

    this.screen.render();
    this.setFilters(this.env.filters.join(', '));
  }

  setOutput(output) {
    this.output.setContent(output);
    this.screen.render();
  }

  setTitle(title) {
    this.title.setContent(title);
    this.screen.render();
  }

  setStatus(status) {
    this.status.setContent(status);
    this.screen.render();
  }

  setFilters(filters) {
    this._filters = filters;
    let value = this._filters !== '' ? this._filters : '(none)';
    this.filters.setContent(`Filters: ${value}`);
    this.screen.render();
  }

  setResults(results) {
    let prevResults = this._results;

    this._results = results;
    this._setCurrentIndex(0);

    let prevHadErrors = prevResults.length !== 0;
    let currHasErrors = results.length !== 0;

    if (prevHadErrors !== currHasErrors) {
      this.beep();
    }
  }

  _nextResult() {
    let nextIndex = this._currentIndex + 1;
    if (nextIndex < this._results.length) {
      this._setCurrentIndex(nextIndex);
    } else {
      this.beep();
    }
  }

  _prevResult() {
    let prevIndex = this._currentIndex - 1;
    if (prevIndex >= 0) {
      this._setCurrentIndex(prevIndex);
    } else {
      this.beep();
    }
  }

  _setCurrentIndex(index) {
    this._currentIndex = index;

    if (!this._results.length) {
      this.setOutput('');
      return;
    }

    let startPad = 10;
    let sectionPad = 4;
    let startPadding = ' '.repeat(startPad);
    let sectionPadding = '\n'.repeat(sectionPad);

    let sections = this._results
      .map((result, index) => {
        return result.message
          .split('\n')
          .map(str => {
            if (this._currentIndex === index) {
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
      .map(str => {
        return sectionPadding + str;
      });

    let lastSectionHeight =
      sections[sections.length - 1].split('\n').length - 1;

    let topPad = 4;
    let bottomPad = Math.max(
      _constants.STDOUT_HEIGHT - lastSectionHeight - topPad,
      topPad
    );
    let scrollPosition = topPad;

    sections.find((section, index) => {
      let isCurrent = index === this._currentIndex;
      if (!isCurrent) scrollPosition += section.split('\n').length - 1;
      return isCurrent;
    });

    scrollPosition = Math.max(scrollPosition - topPad, 0);

    let output =
      '\n'.repeat(topPad - sectionPad) +
      sections.join('') +
      '\n'.repeat(bottomPad);

    this.output.resetScroll();
    this.setOutput(output);
    this.output.scrollTo(scrollPosition);
    this.output.setScroll(scrollPosition);
    this.screen.render();
  }

  beep() {
    if (this.env.beep) {
      (0, _beeper2.default)();
    }
  }
}
exports.Interface = Interface;
