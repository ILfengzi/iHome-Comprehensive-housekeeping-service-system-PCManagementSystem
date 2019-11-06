/*
 * @Author: qiaoge2333
 * @Date: 2019-10-16 08:15:42
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-05 17:43:46
 */
const path = require('path');

module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer:{
    proxy:{
      '/image/':{
        target: "http://www.ilfengzi.club",
        changeOrigin:true,
      },
      "/":{
        target:"https://www.ilfengzi.club",
        changeOrigin:true,
        secure: false,
      }
    },
	  
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
