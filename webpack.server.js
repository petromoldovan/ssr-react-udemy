const path = require('path')

module.exports = {
	//build bundle for nodejs rather than browser
	target: 'node',

	//root file of the app
	entry: './src/server/server.js',

	//output for the bundle.js
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},

	//run webpack with babel
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
						'react',
						'stage-0',   //used for handling async code
						['env', {targets: {browsers: ['last 2 versions']}}]  //babel runs all transform rules needed to meet requirements of the last two browser version
					]
				}
			}
		]
	}
}
