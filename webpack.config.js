const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],
    optimization: {
        minimize: false
    },
    entry: './src/color-palette.js',
    output: {
        path: __dirname + '/dist',
        filename: 'color-palette.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'entry',
                                    corejs: 3.6,
                                    targets: {
                                        node: 'current'
                                    }
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node',
            raw: true,
            entryOnly: true
        })
    ]
}
