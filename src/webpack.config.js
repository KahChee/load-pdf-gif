const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'load-pdf-gif'),
	plugins: [
	  new CopyWebpackPlugin([
			{ from: 'static' }
		])
	]
};