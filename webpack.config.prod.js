const baseWebpackConfig = require('./webpack.config');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var conf = baseWebpackConfig;
//conf.mode = 'production';
conf.mode = 'development';

//conf.plugins.push(
//  new UglifyJSPlugin({
//    sourceMap: true,
//  })
//);

module.exports = conf;
