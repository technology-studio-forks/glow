'use strict';

exports.__esModule = true;
exports.Lang = exports.messages = undefined;
exports.langMessageToString = langMessageToString;

var _util = require('util');

const messages = (exports.messages = {
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

let instance = null;

class Lang {
  constructor(language) {
    this.language = language;
  }

  get(message, ...parts) {
    return (0, _util.format)(messages[this.language][message], ...parts);
  }

  static get(message, ...parts) {
    if (!instance) instance = new Lang('en');
    return instance.get(message, ...parts);
  }
}
exports.Lang = Lang;
