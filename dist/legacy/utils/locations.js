'use strict';

exports.__esModule = true;
exports.toBabelSourceLocation = toBabelSourceLocation;

require('../types');

function toBabelSourceLocation(flowLoc) {
  return {
    start: {
      line: flowLoc.start.line,
      column: flowLoc.start.column
    },
    end: {
      line: flowLoc.end.line,
      column: flowLoc.end.column + 1
    }
  };
}
