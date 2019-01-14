'use strict';

exports.__esModule = true;

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _Lang = require('./Lang');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = async function main(cwd, argv) {
  let cli = (0, _meow2.default)({
    argv,
    // prettier-ignore
    help: `
      ${_chalk2.default.bold.underline(_Lang.Lang.get('helpUsage'))}

        ${_chalk2.default.magenta.bold('glow <...globs> <...flags>')}

      ${_chalk2.default.bold.underline(_Lang.Lang.get('helpFlags'))}

        ${_chalk2.default.magenta('--watch, -w')}         ${_chalk2.default.cyan(_Lang.Lang.get('helpFlagsWatch'))}
        ${_chalk2.default.magenta('--interactive, -i')}   ${_chalk2.default.cyan(_Lang.Lang.get('helpFlagsInteractive'))}
        ${_chalk2.default.magenta('--beep, -b')}          ${_chalk2.default.cyan(_Lang.Lang.get('helpFlagsBeep'))}
        ${_chalk2.default.magenta('--quiet')}             ${_chalk2.default.cyan(_Lang.Lang.get('helpFlagsQuiet'))}
        ${_chalk2.default.magenta('--debug')}             ${_chalk2.default.cyan(_Lang.Lang.get('helpFlagsDebug'))}

      ${_chalk2.default.bold.underline(_Lang.Lang.get('helpExamples'))}

        ${_chalk2.default.cyan(_Lang.Lang.get('helpExamplesBasic'))}
        ${_chalk2.default.magenta('$ glow')}

        ${_chalk2.default.cyan(_Lang.Lang.get('helpExamplesWatch'))}
        ${_chalk2.default.magenta('$ glow --watch')}
        ${_chalk2.default.magenta('$ glow -w')}

        ${_chalk2.default.cyan(_Lang.Lang.get('helpExamplesFile'))}
        ${_chalk2.default.magenta('$ glow src/utils/math.js')}

        ${_chalk2.default.cyan(_Lang.Lang.get('helpExamplesDirectory'))}
        ${_chalk2.default.magenta('$ glow src/components')}

        ${_chalk2.default.cyan(_Lang.Lang.get('helpExamplesGlob'))}
        ${_chalk2.default.magenta('$ glow "src/**/*.test.js"')}

        ${_chalk2.default.cyan(_Lang.Lang.get('helpExamplesMultiGlob'))}
        ${_chalk2.default.magenta('$ glow "src/**/*.test.js" "!src/utils/**"')}
    `.trimRight(),
    flags: {
      watch: {
        type: 'boolean',
        alias: 'w',
        default: false
      },
      interactive: {
        type: 'boolean',
        alias: 'i',
        default: false
      },
      beep: {
        type: 'boolean',
        alias: 'b',
        default: false
      },
      quiet: {
        type: 'boolean'
      },
      debug: {
        type: 'boolean'
      },
      version: {
        type: 'boolean',
        alias: ['v', 'V']
      },
      help: {
        type: 'boolean',
        alias: ['h', 'H']
      }
    }
  });

  let filters = cli.input;
  let { watch, interactive, beep, quiet, debug } = cli.flags;

  let status = await (0, _2.default)({
    cwd,
    filters,
    watch,
    interactive,
    beep,
    quiet,
    debug
  });

  if (status.errors && status.errors.length !== 0) {
    process.exit(1);
  } else if (status.exit) {
    process.exit(status.exit.code);
  }
};
