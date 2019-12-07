// vue.config.js
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  publicPath: '/dashblocks-template/',

  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      //new BundleAnalyzerPlugin({ analyzerMode: 'static' })
    ]
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'manual',
      rtlSupport: false,
      treeShake: true
    }
  },

  transpileDependencies: ['quasar']
};
