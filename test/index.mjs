import test from 'ava';
import prettier from 'prettier';

const plugin = await import('../dist/index.cjs');

function formatter(code) {
  return prettier.format(code, {
    plugins: [plugin.default],
    parser: 'package-json',
  });
}

const original = `{
  "name": "prettier-plugin-package-json",

    "author": "abc<abc@example.com>(http://example.com)",

  "main": "./index.js",
  "typings":"","keywords":["o","c"],
  "preferGlobal": false,
  "license": "unlicensed",  "workspaces":["ff/*","ff/*","a/*"],
  "files":["l","l","a"],
"repository":{
  "url": "","directory":"m","type": ""
},"resolutions":{
  "b":"","a":""
},"engines":{"node":"d ||    < 5"}
}
`;

test('Usage', (t) => {
  const actual = formatter(original);

  t.snapshot(actual);
});

test('Empty', (t) => {
  const actual = formatter('{}');

  t.snapshot(actual);
});
