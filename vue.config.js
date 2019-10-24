const path = require('path');

module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer:{
	  proxy: "http://www.ilfengzi.club"
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  },
};
