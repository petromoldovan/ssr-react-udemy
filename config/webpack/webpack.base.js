module.exports = {
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
