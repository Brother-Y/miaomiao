import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios=axios;

import Srcoller from '@/components/Scroller'
Vue.component('Scroller',Srcoller) // 滚动

import Loading from '@//components/Loading'
Vue.component('Loading',Loading) // 加载

Vue.config.productionTip = false
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
