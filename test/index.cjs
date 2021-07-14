'use strict';

const test = require('ava').default;
const { format } = require('prettier');

const original = `{
  "name": "prettier-plugin-package-json",
  "private": true,
  "main": "./index.js",
  "license": "unlicensed"
}
`;

const expected = `{
  "private": true,
  "name": "prettier-plugin-package-json",
  "version": "0.0.0",
  "license": "UNLICENSED",
  "main": "index.js"
}`;

test('Usage', (t) => {
  const actual = format(original, {
    plugin: ['.'],
    parser: 'package-json',
  });

  t.is(actual, expected);
});
