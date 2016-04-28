module.exports = {
  context: __dirname,
  entry: "./javascripts/zynth.js",
  output: {
    path: "./javascripts",
    publicPath: "/javascripts/",
    filename: "main.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  module: {
    loaders: [
    {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }
  ]
  },
  devtool: 'source-map'
};
