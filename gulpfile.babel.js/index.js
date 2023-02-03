/*
 * @title gulpfile.babel.js
 * @description A directory file loader to include all the gulp tasks
 */

// Tasks
import { build } from './tasks/build';
import { dev } from './tasks/dev';

exports.build = build;
exports.default = dev;
