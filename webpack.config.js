import webpack from 'webpack';
import path from 'path';

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
    plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  } else {
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin()),
      plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  return plugins;
};

const configuration =  {
  entry: getEntries(),
  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: getPlugins(),
  module: {
    loaders: [
      {
        loaders: ['react-hot', 'babel'],
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
        exclude: /node_modules/,
        include: path.join(__dirname, 'static'),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        include: __dirname,
        loaders: ['style', 'css', 'sass']
      },
    ]
  },
};

if (!isProduction) {
  configuration.devtool = 'cheap-module-eval-source-map'
}

export default configuration;