/*
 * @title Styles
 * @description A task to compile Sass to CSS.
 */

// Dependencies
import { src, dest, series } from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import errorHandler from '../util/errorHandler.js';
import { isProd } from '../util/env.js';
import browserSync from 'browser-sync';
const sass = gulpSass(dartSass);

// Config
import { paths } from '../config';

export function scss() {
  return src(paths.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(gulpif(isProd, sourcemaps.init()))
    .pipe(
      sass({
        includePaths: ['node_modules'],
        outputStyle: 'compressed',
      })
    )
    .pipe(postcss([autoprefixer()]))

    .pipe(gulpif(isProd, sourcemaps.write('.')))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

export const styles = series(scss);
