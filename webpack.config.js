const NODE_ENV = process.env.NODE_ENV || 'development';

let
	webpack = require('webpack'),
	path = require('path');

module.exports = {
	context: path.join(__dirname, 'src', 'js'),

	entry: {
		chat: "./main.js",
		chatWindow: "./chatWindow.js",
		simpleScrollbar: "./vendor/simpleScrollbar.js"
	},
	output: {
		path: path.join(__dirname, 'dist', 'js'),
		filename: "[name].js"
	},

	plugins: [],

	// module: {
	// 	loaders: [
	// 		{
	// 			test: /\.js$/,
	// 			exclude: /(node_modules|bower_components)/,
	// 			loader: 'babel-loader',
	// 			query: {
	// 				presets: ['es2015'],
	// 				plugins: ['transform-runtime']
	// 			}
	// 		}
	// 	]
	// },
	devtool: (NODE_ENV == 'development') ? 'cheap-inline-module-source-map' : false,
	watch: NODE_ENV == 'development'
}

if (NODE_ENV == 'production') {
	module.exports.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				warnings: false,
				drop_console: true,
				unsafe: true
			})
		);
}
