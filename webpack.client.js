const path = require('path')

module.exports = {
	//root file of the app
	entry: './src/client/client.js',

	//output for the bundle.js
	output: {
		filename: 'client-bundle.js',
		path: path.resolve(__dirname, 'public')
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
