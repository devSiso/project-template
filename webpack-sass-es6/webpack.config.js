'use strict';

var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var precss = require('precss');

module.exports = {
	watch: false,
	entry: {
		main: './src/main'
	},
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist/js'
	},
	resolve: {
    alias: {}
  },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src/assets/js'),
				loader:'babel-loader',
				query: {
		 			presets: ['es2015']
				}
			},
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract('css!postcss!sass')
			},
			{
				test: /\.html$/,
				loaders: []
			},
			{
				test: /\.(gif|png|jpg)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=../img/[name].[ext]'
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=../fonts/[name].[ext]'
			}
		]
	},
	postcss: function () {
		return [ autoprefixer, precss ]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/public/', to: '../' }
		]),
		new ExtractTextPlugin('../css/bundle.css'),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: {
				baseDir: ['dist']
			}
		})
	]
};
