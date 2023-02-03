const os = require('os');

/*
 *  Fichier de configuration
 */

// Navigateurs pour BrowserSync
export const browsers =
  os.platform() == 'darwin'
    ? ['google chrome' /*, 'firefox'*/] // osx
    : ['chrome' /*, 'firefox'*/]; // windows

// Paths (ne pas toucher)
export const paths = {
  src: './src',
  dest: './dist',
  deploy: './dist/**/*',
  styles: {
    src: 'src/styles/main.scss',
    watch: 'src/styles/**/*.scss',
    dest: 'dist/styles',
  },
  scripts: {
    src: './src/scripts/Main.js',
    watch: 'src/scripts/**/*.js',
    dest: 'dist/scripts',
  },
  templates: {
    src: 'src/*.{twig,html}',
    watch: 'src/**/*.{twig,html}',
    dest: 'dist/',
  },
  assets: {
    src: 'src/assets/**/*',
    icons: 'src/assets/icons/**/*.svg',
    dest: 'dist/assets',
  },
  imagemin: {
    test: /\.(svg)$/i,
    pngquant: {},
    gifsicle: {},
    svgo: true, // svgo prefixes id with an hash, wich is bad with <use>
    optipng: null, // has to be set to null since we use pngquant
    jpegtran: null, // has to be set to null since we use MozJpg
  },
};
