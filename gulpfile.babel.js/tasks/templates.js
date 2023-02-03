/*
 * @title Templates
 * @description A task to compile templates via Twig.js
 */

// Dependencies
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import errorHandler from '../util/errorHandler.js';
import beautify from 'gulp-jsbeautifier';
import twig from 'gulp-twig';

// Config
import { paths } from '../config';

// Task
export function templates() {
  return src(paths.templates.src)
    .pipe(plumber({ errorHandler }))
    .pipe(twig())
    .pipe(
      beautify({
        indent_size: 4,
      })
    )
    .pipe(dest(paths.templates.dest));
}
