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
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015'],
					plugins: ['transform-runtime']
				}
			}
		]
	},

	watch: true
}