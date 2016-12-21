var path = require('path');

module.exports = {
	entry: {
		chat: "./js/src/main.js",
		chatWindow: "./js/src/chatWindow.js"
	},
	output: {
		path: path.join(__dirname, 'js', 'dist'),
		filename: "[name].js"
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
	},

	watch: true
}