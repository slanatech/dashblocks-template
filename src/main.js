import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

// Vuetify CSS
import 'vuetify/dist/vuetify.min.css';

// Dashblocks CSS
import 'dashblocks/dist/dashblocks.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
