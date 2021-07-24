'use strict';

const normalizeData = require('normalize-package-data');
const normalizeBin = require('npm-normalize-package-bin');
const { format } = require('prettier-package-json');
const sortKeys = require('sort-keys');

const { keyOrder } = require('./key-order.cjs');

function mergeArray(bundledDependencies, bundleDependencies) {
  return bundledDependencies || bundleDependencies
    ? [
        ...new Set([
          ...(bundledDependencies || []),
          ...(bundleDependencies || []),
        ]),
      ]
    : undefined;
}

function handle(json) {
  const {
    'engine-strict': x,
    preferGlobal,
    engineStrict,
    bundledDependencies,
    bundleDependencies,
    typings,
    types = typings,
    jsnext,
    esnext = jsnext,
    module: Module = esnext,
    ...data
  } = json;

  return {
    ...data,
    module: Module,
    types,
    bundledDependencies: mergeArray(bundledDependencies, bundleDependencies),
  };
}

function haveGit(io) {
  return (
    io.repository &&
    io.repository.url &&
    (io.repository.type === 'git' || io.repository.url.startsWith('git+'))
  );
}

function sort(object) {
  return sortKeys(object, { deep: true });
}

function normalize(text) {
  const io = sort(normalizeBin(handle(JSON.parse(text))));
  normalizeData(io, true);

  delete io._id;
  delete io.readme;

  if (io.license && /^unlicensed?$/i.test(io.license)) {
    io.license = io.private ? 'UNLICENSED' : 'Unlicense';
  }

  if (haveGit(io)) {
    io.repository.type = 'git';
    io.repository.url = io.repository.url.replace(/^git\+/, '');
  }

  if (io.repository && io.repository.directory) {
    io.repository.directory = io.repository.directory.replace(
      /(^\/)|(\/$)/,
      '',
    );
  }

  if (!io.version) {
    io.version = '0.0.0';
  }

  if (io.main && io.main.startsWith('./')) {
    io.main = io.main.replace(/^\.\//, '');
  }

  if (io.files) {
    io.files.forEach((item, index) => {
      if (item.startsWith('./')) {
        io.files[index] = item.replace(/^\.\//, '');
      }
    });
  }

  if (io.repository) {
    const { directory, url, type, ...rest } = io.repository;

    io.repository = {
      ...rest,
      type,
      url,
      directory,
    };
  }

  if (
    (!io.homepage || io.homepage.startsWith('https://github.com/')) &&
    haveGit(io)
  ) {
    io.homepage = [
      io.repository.url.replace(/\.git$/, ''),
      io.repository.directory,
    ]
      .filter(Boolean)
      .join('/tree/master/');
  }

  if (io.homepage && io.homepage.endsWith('#readme')) {
    io.homepage = io.homepage.replace(/#readme$/, '');
  }

  if (io.engines && io.engines.node) {
    io.engines.node = io.engines.node
      .split('||')
      .map((item) => item.replace(/\s/g, ''))
      .join(' || ')
      .replace(/\s+/g, ' ');
  }

  return format(io, { expandUsers: true, keyOrder });
}

module.exports = { normalize };
