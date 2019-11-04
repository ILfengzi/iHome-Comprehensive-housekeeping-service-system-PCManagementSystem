/*
 * @Author: qiaoge2333
 * @Date: 2019-10-16 08:15:42
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-03 22:18:58
 */
const path = require('path');

module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer:{
	  proxy: "https://www.ilfengzi.club"
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
