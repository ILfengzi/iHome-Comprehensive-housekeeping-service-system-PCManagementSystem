/*
 * @Author: qiaoge2333
 * @Date: 2019-11-06 15:00:21
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-06 16:24:49
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './Components/user'





Vue.use(Vuex);


export default new Vuex.Store({
  modules:{
    user
  },
})