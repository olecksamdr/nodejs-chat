var path = require('path');

module.exports = {
	entry: "./js/src/main.js",
	output: {
	filename: "./js/dist/chat.js"
		},
	module: {
		loaders: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-0']
				}
			}
		]
	}
}