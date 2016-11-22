var path = require('path');
module.exports = {
    entry: './src/bouncing-ball-entry.js',
    output: {
        path: __dirname,
        filename: 'lib/bouncing-ball.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src/'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
