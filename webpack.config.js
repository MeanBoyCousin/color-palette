const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],
    optimization: {
        minimize: false
    },
    entry: {
        'color-palette': './src/color-palette.js',
        'config-init': './src/config-init.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
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
            },
            {
                test: /\.js$/,
                loader: 'string-replace-loader',
                options: {
                    search:
                        'require(`${process.cwd()}/color-palette.config.js`)',
                    replace:
                        '__non_webpack_require__(`${process.cwd()}/color-palette.config.js`)'
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node',
            raw: true,
            entryOnly: true
        }),
        new webpack.NormalModuleReplacementPlugin(
            /^const answers = require\('.\/color-palette.config.js'\)$/g,
            `const answers = __non_webpack_require__('./color-palette.config.js')`
        )
    ]
}
