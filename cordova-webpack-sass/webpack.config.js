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

module.exports = {
	watch: false,
	entry: {
		main: './src/main'
	},
	output: {
		filename: 'bundle.js',
		path: __dirname + '/app/www/js'
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
			{ from: './src/public/', to: '../' },
			{ from: './src/config.xml', to: '../../' }
		]),
		new ExtractTextPlugin('../css/bundle.css'),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: {
				baseDir: ['app/www']
			}
		}),
		new SpritesmithPlugin({
         src: {
            cwd: path.resolve(__dirname, 'src/assets/sprite'),
            glob: '*.png'
         },
         target: {
            image: path.resolve(__dirname, 'app/www/css/sprite.png'),
            css: path.resolve(__dirname, 'app/www/css/sprite.css')
         },
         apiOptions: {
            cssImageRef: "sprite.png"
         }
     })
	]
};
