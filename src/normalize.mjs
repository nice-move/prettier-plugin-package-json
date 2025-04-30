import normalizeData from 'normalize-package-data';
import normalizeBin from 'npm-normalize-package-bin';
import { format } from 'prettier-package-json';
import sortKeys from 'sort-keys';

import { keyOrder } from './key-order.mjs';

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

function trimVersion(version) {
  return version
    .split('||')
    .map((item) => item.trim().replace(/\s+/g, ' '))
    .sort()
    .join(' || ');
}

export function normalize(text) {
  const io = sort(normalizeBin(handle(JSON.parse(text))));

  io.name = io.name ? io.name.trim() : '';

  io.version = io.version ? io.version.trim() || '0.0.0' : '0.0.0';

  if (io.description) {
    io.description = io.description
      .trim()
      .replace(/\.$/, '')
      .replace(/^[a-z]/, (w) => w.toUpperCase());
  }

  if (io.license) {
    io.license = io.license.trim();
  }

  normalizeData(io, true);

  delete io._id;
  delete io.readme;

  if (io.license && /^unlicensed?$/i.test(io.license)) {
    io.license = io.private ? 'UNLICENSED' : 'Unlicense';
  }

  if (haveGit(io)) {
    io.repository.type = 'git';
  }

  if (io.repository && io.repository.directory) {
    io.repository.directory = io.repository.directory.replace(
      /(^\/)|(\/$)/,
      '',
    );
  }

  if (!io.keywords && !io.private) {
    io.keywords = [];
  }

  if (io.keywords && io.keywords.length > 0) {
    io.keywords = [...new Set(io.keywords)];
  }

  if (io.files && io.files.length > 0) {
    io.files = [...new Set(io.files)];
  }

  if (
    io.workspaces &&
    Array.isArray(io.workspaces) &&
    io.workspaces.length > 0
  ) {
    io.workspaces = [...new Set(io.workspaces)].sort();
  }

  if (io.workspaces?.packages && io.workspaces.packages.length > 0) {
    io.workspaces.packages = [...new Set(io.workspaces.packages)].sort();
  }

  if (io.workspaces?.nohoist && io.workspaces.nohoist.length > 0) {
    io.workspaces.nohoist = [...new Set(io.workspaces.nohoist)].sort();
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
  if (io.homepage) {
    io.homepage = io.homepage.replace(/^git\+/, '');
  }
  if (io.engines) {
    if (io.engines.vscode) {
      io.engines.vscode = trimVersion(io.engines.vscode);
    }

    if (io.engines.node) {
      io.engines.node = trimVersion(io.engines.node);
    }

    if (io.engines.npm) {
      io.engines.npm = trimVersion(io.engines.npm);
    }
  }

  return format(io, { expandUsers: true, keyOrder });
}
