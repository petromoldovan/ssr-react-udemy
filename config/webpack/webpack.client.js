const path = require('path')
const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')

const config = {
	//root file of the app
	entry: './src/client/client.js',

	//output for the bundle.js
	output: {
		filename: 'client-bundle.js',
		path: path.resolve(__dirname, '../../public')
	}
}

module.exports = merge(baseConfig, config)
