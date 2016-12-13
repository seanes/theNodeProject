import webpack from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';

const getEntries = () => {
    const entries = [];

    entries.push('./src/index');

    if (!isProduction) {
        entries.push('webpack-hot-middleware/client');
    }
    return entries;
};

const getPlugins = () => {
    const plugins = [];

    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'BABEL_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }));

    if (isProduction) {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
        plugins.push(new webpack.optimize.AggressiveMergingPlugin());
    } else {
        plugins.push(new webpack.optimize.OccurrenceOrderPlugin()),
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return plugins;
};

export default {
    entry: getEntries(),
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    plugins: getPlugins(),
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                include: __dirname,
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                },
            },
        ]
    },
};