'use strict';

const test = require('ava').default;
const { format } = require('prettier');

const original = `{
  "name": "prettier-plugin-package-json",
  "private": true,

    "author": "abc<abc@example.com>(http://example.com)",

  "main": "./index.js",
  "typings":"",
  "preferGlobal": false,
  "license": "unlicensed",
"repository":{
  "url": "","directory":"m","type": ""
},"resolutions":{
  "b":"","a":""
},"engines":{"node":"d ||    < 5"}
}
`;

const expected = `{
  "private": true,
  "name": "prettier-plugin-package-json",
  "version": "0.0.0",
  "license": "UNLICENSED",
  "author": {
    "name": "abc",
    "email": "abc@example.com",
    "url": "http://example.com"
  },
  "repository": {
    "type": "",
    "url": "",
    "directory": "m"
  },
  "types": "",
  "main": "index.js",
  "resolutions": {
    "a": "",
    "b": ""
  },
  "engines": {
    "node": "d || <5"
  }
}`;

test('Usage', (t) => {
  const actual = format(original, {
    plugin: ['.'],
    parser: 'package-json',
  });

  t.is(actual, expected);
});
