var path = require('path');
module.exports = {
    entry: './src/bouncing-ball.js',
    output: {
        path: __dirname,
        filename: 'lib/bouncing-ball.js',
        library: 'BouncingBall',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src/'),
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                    plugins: [
                        "add-module-exports"
                    ]
                }
            }
        ]
    }
};
