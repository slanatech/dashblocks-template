import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Dashblocks CSS
import 'dashblocks/dist/dashblocks.css';
import './quasar';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
