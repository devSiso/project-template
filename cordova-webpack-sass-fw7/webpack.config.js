'use strict';

var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var precss = require('precss');
var SpritesmithPlugin = require('webpack-spritesmith');

var __f7Path = path.join(__dirname, 'node_modules/framework7/dist');
var __cordova = path.join(__dirname, 'cordova');
var __src = path.join(__dirname, 'src');

module.exports = {
	watch: false,
	entry: {
		main: './src/main'
	},
	output: {
		filename: 'bundle.js',
		path: path.join(__cordova, 'www/js')
	},
	resolve: {
		alias: {
			'framework7.ios.min.css': path.join(__f7Path, 'css/framework7.ios.min.css'),
			'framework7.ios.colors.min.css': path.join(__f7Path, 'css/framework7.ios.colors.min.css'),

			'framework7.material.min.css': path.join(__f7Path, 'css/framework7.material.min.css'),
			'framework7.material.colors.min.css': path.join(__f7Path, 'css/framework7.material.colors.min.css'),

			'main.sass': path.join(__src, 'assets/sass/main.sass'),
			'bootstrap': path.join(__src, 'assets/js/bootstrap.js'),

			'libs': path.join(__src, 'assets/js/libs'),
			'components': path.join(__src, 'assets/js/components')
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.join(__src, 'assets/js'),
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{ test: /\.sass$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },

			{ test: /\.html$/, loaders: [] },

			{ test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png' },
			{ test: /\.jpe?g$/, loader: 'url?limit=8192&mimetype=image/jpg' },
			{ test: /\.gif$/, loader: 'url?limit=8192&mimetype=image/gif' },
			{ test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
		]
	},
	postcss: function() {
		return {
			defaults: [ autoprefixer, precss ],
			cleaner:  [ autoprefixer({ browsers: ['not Explorer', 'not Edge', 'not Opera', 'not Firefox', 'not FirefoxAndroid', 'not ExplorerMobile'] }) ]
		};
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: path.join(__src, 'public'), to: '../' },
			{ from: path.join(__src, 'assets/img'), to: '../img/' },
			// { from: path.join(__cordova, 'platforms/browser/platform_www'), to: '../' },
			// { from: path.join(__cordova, 'platforms/browser/config.xml'), to: '../' }
		]),
		new ExtractTextPlugin('../css/bundle.css'),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: {
				baseDir: ['cordova/www']
			}
		}),
		new SpritesmithPlugin({
			src: {
				cwd: path.join(__src, 'assets/sprite'),
				glob: '*.png'
			},
			target: {
				image: path.join(__cordova, 'www/css/sprite.png'),
				css: path.join(__cordova, 'www/css/sprite.css')
			},
			apiOptions: {
				cssImageRef: "sprite.png"
			}
		})
	]
};
