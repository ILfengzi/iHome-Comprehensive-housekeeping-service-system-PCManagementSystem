/*
 * @Author: qiaoge2333
 * @Date: 2019-10-16 08:15:42
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-06 17:31:18
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import './styles/index.scss';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import echarts from 'echarts';
import moment from 'moment';
import Vuex from 'vuex';
import store from './store';
import VueCookies from 'vue-cookies';
import Crypto from 'crypto';

Vue.use(VueCookies);
Vue.use(Vuex);
Vue.prototype.$moment = moment;
moment.locale('zh-cn');
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(echarts);
Vue.config.productionTip = false;
Vue.prototype.$crypto = Crypto;
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
