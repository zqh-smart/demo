import Vue from 'vue'
import App from './App'
import router from './router'
import md5 from 'js-md5'



import MyHttpServer from './plugins/http';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.use(MyHttpServer);

Vue.prototype.$md5 = md5;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
