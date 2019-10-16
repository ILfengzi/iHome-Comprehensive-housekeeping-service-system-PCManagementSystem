const path = require('path');

module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer:{
	  port:3000,
	  proxy: "http://localhost:8080"
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
