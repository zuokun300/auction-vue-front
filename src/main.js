import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/default.css'
import './assets/css/styles.css'
import './assets/css/normalize.css'
import './plugins/element.js'
import './plugins/axios'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    });

Vue.config.productionTip = false

Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
