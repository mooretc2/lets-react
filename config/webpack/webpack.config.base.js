/* eslint-disable no-underscore-dangle, import/extensions */

const path = require('path');
const Webpack = require('webpack');

const APP_CONFIG = require('../app/app.config.js');
const APP_PATHS = require('../app/paths.config.js');
const PACKAGE = require('../../package.json');

module.exports = (env) => {

  /*
   * constants
   */

  const BABEL_CONFIG = path.resolve(__dirname, '../babel/babel.config.js');
  const BASE_PATH = `/${env.basePath || 'app'}/`;
  const ENV_DEV = 'development';
  const ENV_PROD = 'production';

  /*
   * loaders
   */

  const BABEL_LOADER = {
    test: /\.js$/,
    exclude: /node_modules/,
    include: [
      APP_PATHS.ABS.SOURCE,
    ],
    use: {
      loader: 'babel-loader',
      options: {
        configFile: BABEL_CONFIG,
      },
    },
  };

  const FILE_LOADER_ASSETS_IMAGES = {
    test: /\.(gif|ico|jpg|jpeg|png|svg|webp)(\?.*)?$/,
    exclude: /node_modules/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[hash:8].[ext]',
        outputPath: `${APP_PATHS.REL.STATIC_ASSETS_IMAGES}/`,
      }
    }]
  };

  /*
   * plugins
   */

  const BANNER_PLUGIN = new Webpack.BannerPlugin({
    banner: APP_CONFIG.BANNER,
    entryOnly: true,
  });

  const DEFINE_PLUGIN = new Webpack.DefinePlugin({
    __BASE_PATH__: JSON.stringify(BASE_PATH),
    __ENV_DEV__: JSON.stringify(!!env.development),
    __ENV_PROD__: JSON.stringify(!!env.production),
    __PACKAGE__: JSON.stringify(PACKAGE.name),
    __VERSION__: JSON.stringify(`v${PACKAGE.version}`),
  });

  // https://github.com/moment/moment/issues/2373
  // https://stackoverflow.com/a/25426019/196921
  // https://github.com/facebookincubator/create-react-app/pull/2187
  const IGNORE_MOMENT_LOCALES = new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);

  /*
   * base webpack config
   */

  return {
    bail: true,
    entry: [
      '@babel/polyfill',
      APP_PATHS.ABS.APP,
    ],
    mode: env.production ? ENV_PROD : ENV_DEV,
    module: {
      rules: [
        BABEL_LOADER,
        FILE_LOADER_ASSETS_IMAGES,
      ],
    },
    node: {
      net: 'empty',
    },
    optimization: {
      minimize: !!env.production,
    },
    output: {
      path: APP_PATHS.ABS.BUILD,
      publicPath: BASE_PATH,
    },
    performance: {
      hints: false, // disable performance hints for now
    },
    plugins: [
      DEFINE_PLUGIN,
      BANNER_PLUGIN,
      IGNORE_MOMENT_LOCALES,
    ],
    resolve: {
      extensions: ['.js', '.css'],
      modules: [
        APP_PATHS.ABS.SOURCE,
        APP_PATHS.ABS.NODE,
      ],
    },
  };
};
