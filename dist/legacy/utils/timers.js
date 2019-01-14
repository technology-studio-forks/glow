'use strict';

exports.__esModule = true;
exports.now = now;
exports.seconds = seconds;
function now() {
  return Date.now();
}
function seconds(start, end) {
  var seconds = (Date.now() - start) / 1000;
  var rounded = Math.round(seconds * 100) / 100;
  return rounded;
}
