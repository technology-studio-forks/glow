'use strict';

exports.__esModule = true;
exports.Lang = exports.messages = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.langMessageToString = langMessageToString;

var _util = require('util');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var messages = (exports.messages = {
  en: {
    title: 'Glow v%s (flow-bin v%s)',
    description: 'CLI interface for working through Flow errors',
    doneIn: 'Done in %ds.',
    helpUsage: 'Usage',
    helpFlags: 'Flags',
    helpFlagsWatch: '...',
    helpFlagsInteractive: '...',
    helpFlagsBeep: 'Emit a beep when Flow errors are detected',
    helpFlagsQuiet: 'Silence any stdout output unrelated to Flow status',
    helpFlagsDebug: '...',
    helpFormatters: 'Formatters',
    helpFormattersPretty: 'Format in an easy to read way (Default)',
    helpExamples: 'Examples',
    helpExamplesBasic: 'Display errors for current Flow project:',
    helpExamplesWatch: 'Start Glow in interactive mode and watch for changes:',
    helpExamplesFile: 'Display errors for a single file:',
    helpExamplesDirectory: 'Display errors for files inside a directory:',
    helpExamplesGlob: 'Display errors that match a glob:',
    helpExamplesMultiGlob: 'Display errors that match multiple globs:',
    gettingFlowStatus: 'Getting Flow status...',
    flowDidntFindAnyErrors: "Flow didn't find any errors. Nice work!",
    foundError: 'Found %d error.',
    foundErrors: 'Found %d errors.',
    foundErrorsWithFilters: '%s (Filters match %d)',
    noFlowBinary: "Couldn't find any flow binaries in %s",
    noFlowConfig: "Couldn't find a .flowconfig file"
  }
});
function langMessageToString(message) {
  return message;
}

var instance = null;

var Lang = (exports.Lang = (function() {
  function Lang(language) {
    (0, _classCallCheck3.default)(this, Lang);

    this.language = language;
  }

  Lang.prototype.get = function get(message) {
    for (
      var _len = arguments.length,
        parts = Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      parts[_key - 1] = arguments[_key];
    }

    return _util.format.apply(
      undefined,
      [messages[this.language][message]].concat(parts)
    );
  };

  Lang.get = function get(message) {
    var _instance;

    if (!instance) instance = new Lang('en');

    for (
      var _len2 = arguments.length,
        parts = Array(_len2 > 1 ? _len2 - 1 : 0),
        _key2 = 1;
      _key2 < _len2;
      _key2++
    ) {
      parts[_key2 - 1] = arguments[_key2];
    }

    return (_instance = instance).get.apply(_instance, [message].concat(parts));
  };

  return Lang;
})());
