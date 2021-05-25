var path = require('path');


module.exports = {
    entry: './src/main/js/index.js',
    devtool: 'sourcemaps',
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
                       "presets": [
                         [
                           "@babel/preset-env",
                           {
                             "targets": {
                               "browsers": [
                                 ">0.25%",
                                 "not ie 11",
                                 "not op_mini all"
                               ]
                             }
                           }
                         ],
                         "@babel/preset-react"
                       ],
                       "plugins": [
                         "@babel/plugin-transform-runtime"
                       ]
                     }
                }]
            }
        ]
    }
};
