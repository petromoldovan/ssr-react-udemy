const path = require('path')
const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const webpackNodeExternals = require('webpack-node-externals')

const config = {
	//build bundle for nodejs rather than browser
	target: 'node',

	//root file of the app
	entry: './src/server/server.js',

	//output for the bundle.js
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../../build')
	},

	//everything that exists in node modules will not be included in server side bundle.js
	externals: [webpackNodeExternals()]
}

module.exports = merge(baseConfig, config)
