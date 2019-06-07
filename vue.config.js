// vue.config.js
const webpack = require("webpack");
module.exports = {
  publicPath: "/dashblocks-template/",
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }
};
