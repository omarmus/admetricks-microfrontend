const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const AngularTemplateCacheWebpackPlugin = require('./plugins/angular-templatecache-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/js/app.js'),
  output: {
    publicPath: "http://localhost:8080/",
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
          },
        }],
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        use: 'file-loader?outputPath=fonts/'
      },
      {
        test: /.html$/,
        exclude: /index.html$/,
        use: 'html-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'AngularJS - Webpack',
      template: 'index.html',
      inject: true
    }),
    new ModuleFederationPlugin({
      name: "angularjshost",
      filename: "remoteEntry.js",
      remotes: {
        admetricks: "admetricks@http://localhost:8888/remoteEntry.js",
      },
      exposes: {},
      shared: require("./package.json").dependencies,
    }),
    // new AngularTemplateCacheWebpackPlugin({
    //   source: 'src/**/*.html'
    //   /**
    //    * See options and defaults below for more details
    //    */
    // })
  ]
};