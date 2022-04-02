import Vue from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva';
import router from './router'

Vue.use(VueKonva);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
