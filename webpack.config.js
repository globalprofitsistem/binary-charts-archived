const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;

module.exports = {
    entry: './src',
    output: {
        library: 'binary-charts',
        libraryTarget: 'umd',
        filename: 'binary-charts.js',
        path: path.join(__dirname, 'lib'),
    },
    devtool: env === 'production' ? 'source-map' : 'eval',
    module: {
        loaders: [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.js$/, exclude: [/node_modules/, /highcharts/], loader: 'eslint-loader' },
            { test: /\.svg$/, loader: 'babel-loader?presets[]=es2015,presets[]=react!svg-react' },
        ],
    },
    plugins: env === 'production' ? [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ] : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
        },
    },
};
