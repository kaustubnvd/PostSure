const path = require('path');

module.exports = {
    entry: './src/user-auth.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '..', '..', 'dist'),
    },
    //devtool: 'eval-cheap-source-map',
    module: {
        rules: [ 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};