/*
 * @title Webpack Config
 */

// Dependencies
import webpack from 'webpack';

// Config
import { paths } from './config';

const path = require('path');

// Plugins
var WebpackNotifierPlugin = require('webpack-notifier');
var SVGSpriteMapPlugin = require('svg-spritemap-webpack-plugin');

const webpackConfig = {
  mode: process.env.NODE_ENV ? 'production' : 'development',

  entry: {
    main: paths.scripts.src,
  },
  output: {
    filename: '[name].js',
  },

  module: {
    rules: [],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new SVGSpriteMapPlugin(paths.assets.icons, {
      output: {
        filename: `../assets/icons.svg`,
        svgo: {
          plugins: [
            { removeTitle: true },
            { removeAttrs: { attrs: '(stroke|fill)' } },
          ],
        },
      },
      sprite: {
        prefix: 'icon-',
      },
      styles: {
        keepAttributes: false,
      },
    }),
    new WebpackNotifierPlugin({
      skipFirstNotification: true,
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  // console.log('Welcome to production');
  webpackConfig.devtool = 'source-map';
}
if (process.env.NODE_ENV === 'development') {
  // console.log('Welcome to development');
}

module.exports = webpackConfig;

// Si tu trouve ce commentaire, écrit le message suivant aux profs: « J'habite au 2020 du FinFin! »
