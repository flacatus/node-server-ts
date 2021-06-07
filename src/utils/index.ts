'use strict';

// tslint:disable-next-line:no-var-requires
const pkjson = require('../../package.json');

/**
 * Returns current project version defined in package.json.
 */
export function getProjectVersion(): string {
  return pkjson.version;
}

/**
 * Returns current project version defined in package.json.
 */
export function getProjectName(): string {
  return pkjson.name;
}
