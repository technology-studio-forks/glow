// @flow
'use strict';
import test from 'ava';
import { spawnSync } from 'child_process';

test('runs without crashing', t => {
  const { status, stderr, stdout } = spawnSync('node', ['cli.js']);
  t.is(status, 0);
  t.is(stdout.toString(), '');
  t.regex(stderr.toString(), /Flow didn't find any errors/);
});
