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

Vue.prototype.$moment = moment;
moment.locale('zh-cn');
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(echarts);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
