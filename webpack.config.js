var path = require('path');

module.exports = {
    entry: './src/main/js/index.js',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './target/classes/static/built/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            }
        ]
    }
};
